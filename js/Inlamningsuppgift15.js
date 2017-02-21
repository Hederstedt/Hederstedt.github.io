let nr1 = 1;
let nr2 = 2;
let sign = "+";
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: props.st1,
        number2: props.st2,
        math: props.st3,
        outputValue: props.st4
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) { 
    const target = event.target;
    const name = target.name;
    const value = target.value;
           if(name == "math")
          {
              sign = event.target.value;
          }
      if(name == "number1")
        {       
          nr1 =  parseFloat(value);
        }
      if(name == "number2")
      {
          nr2 = parseFloat(value);
      }  
      if(sign == "+")
          {
              let  total = nr1 + nr2;
              if(Number.isFinite(total))
                  {
                    this.setState({outputValue: total});
                  }
              else
                  {
                     let error = "du måste skriva in nummer!";
                      this.setState({outputValue: error});
                  }
          }
      if(sign == "-")
          {
              let total = nr1 - nr2;
        if(Number.isFinite(total))
                  {
                    this.setState({outputValue: total});
                  }
              else
                  {
                     let error = "du måste skriva in nummer!";
                      this.setState({outputValue: error});
                  }
          }
      if(sign == "*")
          {
              let total = nr1 * nr2;
              if(Number.isFinite(total))
                  {
                    this.setState({outputValue: total});
                  }
              else
                  {
                     let error = "du måste skriva in nummer!";
                      this.setState({outputValue: error});
                  }
          }
      if(sign == "/")
          {
              let total = nr1 / nr2;
                if(Number.isFinite(total))
                  {
                    this.setState({outputValue: total});
                  }
              else
                  {
                     let error = "du måste skriva in nummer!";
                      this.setState({outputValue: error});
                  }
          }
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form className="mathform">
        <label>
          Vad blir :
          <input        
            name="number1"
            type="text"
            value={this.state.number1}
            onChange={this.handleInputChange} />
        </label>            
          <select name="math" value={this.state.math} onChange={this.handleInputChange}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <input
            name="number2"
            type="text"
            value={this.state.number2}
            onChange={this.handleInputChange} />
            <label name="output">= {this.state.outputValue}</label>
      </form>
    );
  }
}

ReactDOM.render(
  <Reservation st1='1' st2='2' st3='+' st4='3' />,
  document.getElementById('app'));
