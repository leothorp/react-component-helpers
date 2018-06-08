import {bindTo, keys, values, entries, mapObj, iterateObj, isObject, wrap, compose} from './node_modules/lightweight-utils/index.js';

const {React, ReactDOM} = window;
console.log(React, ReactDOM);


const {createFactory, Component, Fragment} = React;

const [div, span, p] = ['div', 'span', 'p'].map(createFactory);


const createClass = (objOrRender) => {
  const methodsObj = isObject(objOrRender) ? objOrRender : {render: objOrRender};
  return class extends Component {
    constructor(props) {
      super(props);
      console.log(methodsObj);

      bindTo(this,
        ...values(methodsObj)
      )

      this.state = (this.getInitialState || wrap({}))(props);
    }

    render() {
      return methodsObj.render();
    }



    testClick() {
      this.setS
    }
  }
}

const component = compose(createFactory, createClass);

const App = component({
  componentWillMount() {
    console.log('will..'); 
  },
  getInitialState(props) {
    return {curr: props.startVal};
  },
  render() {
    return  div({onClick: this.testClick}, this.state.curr);
  },
  testClick() {
    this.setState({curr: this.state.curr + '1'});
  }
});

ReactDOM.render(
  App({startVal: 'monty'}),
  document.getElementById('root')
)
