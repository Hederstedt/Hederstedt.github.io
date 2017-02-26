let apiData;
let landList = [];
let listElement;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.liClickevent = this.liClickevent.bind(this);
        this.filterTextChange = this.filterTextChange.bind(this);
        this.delClick = this.delClick.bind(this);
        this.inputText = this.inputText.bind(this);
        this.blur = this.blur.bind(this);
        this.state = {
            error: 'noProblemo',
            count: 3,
            lista: landList,
            filterText: '',
            selectedCountryIndex: null
        };
    }
    
    filterTextChange(e) {
        this.setState({
            filterText: e.target.value
        });
    }

    delClick(e) {
        let countries = this.state.lista;
        countries.splice(this.state.selectedCountryIndex, 1);
        this.setState({
            lista: countries,
            selectedCountryIndex: null
        })
    }

    liClickevent(index) {
        this.setState({
            selectedCountryIndex: index
        })

    }
    inputText(e) {
        const newTxt = e.target.value;
        let countries = this.state.lista;
        countries.splice(this.state.selectedCountryIndex, 1, newTxt);
        this.setState({
            lista: countries
        })
    }
    blur(e) {
        this.setState({
            selectedCountryIndex: null
        })
    }

    render() {
        if (this.state.count > 0) {
            if (this.state.count % 2 == 0) {
                return (<div><span className="spancountdownmo">Din data är klar om: {this.state.count} sekunder</span></div>);
            }
            else {
                return (<div><span className="spancountdown">Din data är klar om: {this.state.count} sekunder</span></div>);
            }

        }
        else {
            console.log(this.state.error)
            if (this.state.error != 'noProblemo') {
                return (<div><span className="errormessage">Det blev visst något fel när vi skulle hämta datan ? du kanske måste tillåta osäkra scripts?</span></div>);
            }
            else {
                return (
                    <div className="divMedAllt">
                        <FilterBox changeEvent={this.filterTextChange} />
                        <FilterList
                            data={this.state.lista}
                            filter={this.state.filterText}
                            delClick={this.delClick}
                            selectedCountryIndex={this.state.selectedCountryIndex}
                            liClickevent={this.liClickevent}
                            inputText={this.inputText}
                            blur={this.blur}
                        />
                        <br />
                        <span className="spanNrElements">antal element i listan: {this.state.lista.length}</span>
                        <br/>
                    </div>
                );
            }

        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        console.log("api call körs nu ")
        fetch('http://forverkliga.se/JavaScript/api/simple.php?world=all')
            .then(function (response) {
                if (response.status != 200 && response.readyState != 4) {
                    console("problemos buddy " + response.status)
                    return;
                }
                return response.json()
                    .then(function (json) {
                        apiData = json;
                    })
                    .catch(function (error) {
                        console.log("Error with the fetch " + error);
                    })
            })
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        if (this.state.count > 0)
            this.setState({
                count: this.state.count - 1
            });
        else {
            this.componentWillUnmount();
            let elId = 0;
            if(typeof(apiData) == 'undefiend')
                {
                    this.setState({
                        error:"there is a problem"
                    })
                }
            else
                {
            apiData.forEach(element => {
                landList.push(element.name + "   Folkmängd:  " + element.population), elId++
            });
                }
            this.setState({
                lista: landList
            });
        }
    }
}
class FilterBox extends React.Component {
    render() {
        return (<label className="labelfilter">Filter&nbsp;&nbsp;<input className="inputfilter" onChange={this.props.changeEvent} placeholder="Sök här" /></label>);
    }
}
class FilterList extends React.Component {
    handleClick(index, x, event) {
        this.props.liClickevent(index);
    }
    render() {
        const filterLC = this.props.filter.toLowerCase();
        const newList = this.props.data.filter(
            x => x.toLowerCase().includes(filterLC)
        ).map(
            
            (x, index) =>
                <div key={index} onMouseLeave={this.props.blur} className="liLand">
                    <li
                        onMouseEnter={this.handleClick.bind(this, index, { x })}

                    >{x}
                    </li>
                    <button className={'btn btn-danger ' + (this.props.selectedCountryIndex === index ? '' : 'hidden')}
                        onClick={this.props.delClick}
                    >
                        Ta bort
                   </button>
                    <label className={(this.props.selectedCountryIndex === index ? '' : 'hidden')}> &nbsp; Eller ändra direkt i rutan åvanför &nbsp;
                          <input className={'inputhidden ' + (this.props.selectedCountryIndex === index ? '' : 'hidden')}
                            onChange={this.props.inputText} type="text" value={x}
                        /></label>
                </div>
            );

        return (
            <ul >
                {newList}
            </ul>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
);
