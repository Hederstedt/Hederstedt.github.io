const lista = [
    {
        svenska: 'köttbullar', 
        engelska: 'meatballs'
    }, 
    {
        svenska: 'gurka', 
        engelska: 'cucumber'
    },
    {
        svenska: 'kölapp', 
        engelska: 'queue ticket'
    }
];
class Ordlista extends React.Component 
    {
        render()
        {
            let key = 0;
            if (this.props.part == "svenska")
                {
                    
            const nyLista = this.props.lista.map(obj => 
            ( <li key ={ obj.svenska}>{ obj.svenska }</li>));
            return (<ul>{nyLista}</ul>);
             }
             else (this.props.part == "engelska")
            {
                   
                  const nyLista = this.props.lista.map(obj => 
            ( <li key ={ obj.engelska}>{ obj.engelska }</li>));
            return (<ul>{nyLista}</ul>);                                  
            }
             
        }
    }                               
    ReactDOM.render(<Ordlista lista ={lista} part="svenska"/>,
    document.getElementById('divOutput'));
 
   
                   
                               
 
   
class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btntxt: props.initial
          };
        this.changeText = this.changeText.bind(this);
    }
    changeText(e) {
        let newState;
        if (this.state.btntxt == 'Översätt till Engelska') 
        {
            newState = 'Translate to Swedish';
        }
        else 
        {
            newState = 'Översätt till Engelska';  
        }
        this.setState({
            btntxt: newState
        });
                                    
    }
    
    render() {
        if (this.state.btntxt == 'Översätt till Engelska') 
        {

            return (
                    <div className="col-lg-8 col-lg-push-4">< button className = "btn btn-primary col-lg-6 buttonCss"
                    onClick = {this.changeText} > {this.state.btntxt} < /button>
                    </div>
                    );
        }
        else
        {
                ReactDOM.render(<Ordlista lista ={lista} part="engelska"/>,
                   document.getElementById("divOutput2"));
            
            return (
                <div className="col-lg-8 col-lg-push-4">
                    < button className = "btn btn-danger col-lg-6 buttonCss" disabled
                        onClick = {this.changeText} > {this.state.btntxt}
                    </button>
                </div>
            );
        }
            }
}
        ReactDOM.render( 
                    <ToggleButton initial = "Översätt till Engelska" />,
                       document.getElementById('ButtonRow'));
                                                    