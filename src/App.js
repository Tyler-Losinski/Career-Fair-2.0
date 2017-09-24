import React, { Component } from 'react';
import { Card, Menu, Grid, Item, Image, Dropdown} from 'semantic-ui-react'
//import { Legend, PieChart } from 'react-easy-chart';
import logo from './CF_Logo.png';
import data from './Career Fair.json'
import './App.css';

const majors = [ { key: 'Agricultural & Biosystems Engineering', value: 'Agricultural & Biosystems Engineering', text: 'Agricultural & Biosystems Engineering' }, ]

class App extends Component {

  state = { activeItem: 'Companies',
            companies: data.companies
}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Career Fair Info</h2>
          <br />
        </div>
        <p className="App-intro">
          <Grid relaxed columns={3} style={{ padding: 10 }}>
            <Grid.Row>
              <Grid.Column width={3}>
                <Menu inverted pointing vertical>
                  <Menu.Item name='Companies' active={activeItem === 'Companies'} onClick={this.handleItemClick} />
                  <Menu.Item name='Graphs' active={activeItem === 'Graphs'} onClick={this.handleItemClick} />
                  <Menu.Item name='Most Wanted' active={activeItem === 'Most Wanted'} onClick={this.handleItemClick} />
                </Menu>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card fluid>
                  <Card.Content header='Companies' extra={this.state.companies.length}/>
                  <Card.Content >
                    <Item.Group>
                      {
                        this.state.companies.map((data) => {
                          return (
                            <Item>
                              <Item.Image size='tiny' src={data.logo.url} />

                              <Item.Content>
                                <Item.Header as='a'>{data.name}</Item.Header>
                                <Item.Meta>Jobs: {data.jobs}</Item.Meta>
                                <Item.Description>
                                  Description: {data.description}
                                </Item.Description>
                                <Item.Extra>Majors: {data.majors}</Item.Extra>
                              </Item.Content>
                            </Item>)
                        })
                      }
                    </Item.Group>

                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={5}>
                <Card fluid>
                  <Card.Content header='Filters' />
                  <Card.Content >
                    <Item.Group>
                    Major: <Dropdown placeholder='Major' search selection options={majors} onChange={(e,data)=>{
                      var filteredData = []
                        for(var i =0;i<this.state.companies.length;i++){
                          if(this.state.companies[i].majors.indexOf(data.value) > -1)
                            filteredData.push(this.state.companies[i]);
                        }
                        this.setState({
                          companies: filteredData
                        });
                        console.log(data.value);
                      }} />
                    </Item.Group>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </p>
      </div>
    );
  }
}

export default App;
