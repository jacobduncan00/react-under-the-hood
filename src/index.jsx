const createElement = (
  elementType,
  props,
  ...children
) => {
  return {
    elementType: elementType,
    props: props,
    children: children.flat() /* FLATTEN THE CHILD ELEMENTS ARRAY */
  };
};

const buildDOM = vnode => {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }

  /* SUPPORT FOR FUNCTION COMPONENTS */
  if (typeof vnode.elementType === 'function') {
    return buildDOM(vnode.elementType({ ...vnode.props, children: vnode.children }))
  }

  let node = document.createElement(vnode.elementType);

  for (prop in vnode.props) {
    node.setAttribute(prop, vnode.props[prop])
  }

  for (child of vnode.children) {
    node.appendChild(buildDOM(child))
  }

  return node
};

const render = (vdom, container) => {
  container.appendChild(buildDOM(vdom))
};

const starters = [
  {
    name: 'bulbasaur',
    img:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  },
  {
    name: 'charmander',
    img:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  },
  {
    name: 'squirtle',
    img:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
  }
];

const TitleBox = ({ title, children }) => {
  return (
    <div style={`padding: 2em;`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <div style={'text-align: center;'}>
      <TitleBox title={'Pokemon'}>
        {starters.map(({ name, img }) => (
          <div>
            <img src={img} />
            <p>{name}</p>
          </div>
        ))}
      </TitleBox>
    </div>
  );
};

const container = document.getElementById('root'); // Our HTML document's body element
render(<App />, container);
