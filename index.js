import {bindTo, keys, values, entries, mapObj, iterateObj, isObject, wrap, compose, last} from './node_modules/lightweight-utils/index.js';
import domEls from './domFactories.js';

const {React, ReactDOM} = window;
//TODO - lt: vvv make it agnostic as to which implementation of the React API it uses
const {createFactory, Component, Fragment} = React;
const {div} = domEls;
//TODO - lt: vvv add to lw-utils
const bindAndPassCtx = (ctx, ...funcs) => {
  funcs.forEach(fn => ctx[fn.name] = fn.bind(null, ctx));
}

const createClass = (...args) => {
  const displayName = args.length === 2 ? args[0] : null;
  const objOrRender = last(args); 
  const methodsObj = isObject(objOrRender) ? objOrRender : {render: objOrRender};
  const newClass = class extends Component {

    constructor(props) {
      super(props);
      const instance = this;


      bindAndPassCtx(instance,
        ...values(methodsObj)
      )

      const {getInitialState = wrap({})} = instance; 
      this.state = getInitialState(props);
    }
  };
  if (displayName) {
    newClass.displayName = displayName;
  }
  return newClass;
}

const component = compose(createFactory, createClass);

const App = component('Apple', {
  componentDidUpdate(c, prev, xet) {
    console.log('will..', c, prev, xet); 
  },
  getInitialState(c, props) {
    return {curr: props.startVal};
  },
  render(c) {   
    return  div({onClick: c.testClick}, c.state.curr);
  },
  testClick(c) {
    c.setState({curr: c.state.curr + '1'});
  }
});

ReactDOM.render(
  App({startVal: 'monty'}),
  document.getElementById('root')
)
