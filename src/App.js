import React, { Component } from 'react';
import { Card, Menu, Grid, Item, Image, Dropdown, Header,Divider,Segment, Container} from 'semantic-ui-react'
//import { Legend, PieChart } from 'react-easy-chart';
import logo from './CF_Logo.png';
import masterData from './Career Fair.json'
import './App.css';

const majors = [ { key: 'Agricultural & Biosystems Engineering', value: 'Agricultural & Biosystems Engineering', text: 'Agricultural & Biosystems Engineering' },
 ]

class App extends Component {

  constructor(props) {
    super(props);

    var majors = [];
    var state = [];
    var degree = [];
    var positionType = [];
    var sponsorships = [];
    var interviewing = [];

    for(var i = 0; i<masterData.filters.length;i++){
      switch(masterData.filters[i].field_name){
        case 'degree_levels':
          degree.push({key: masterData.filters[i].value, value: masterData.filters[i].value, text: masterData.filters[i].value,});
          break;
        case 'field_3':
          state.push({key: masterData.filters[i].value, value: masterData.filters[i].value, text: masterData.filters[i].value,});
          break;
        case 'field_5':
          interviewing.push({key: masterData.filters[i].value, value: masterData.filters[i].value, text: masterData.filters[i].value,});
          break;
        case 'majors':
          majors.push({key: masterData.filters[i].value, value: masterData.filters[i].value, text: masterData.filters[i].value,});
          break;
        case 'position_types':
          positionType.push({key: masterData.filters[i].value, value: masterData.filters[i].value, text: masterData.filters[i].value,});
          break;
        case 'work_authorizations':
          sponsorships.push({key: masterData.filters[i].value, value: masterData.filters[i].value, text: masterData.filters[i].value,});
          break;

      }
    }

    this.state = {
      activeItem: 'Companies',
      companies: masterData.companies,
      majors: majors,
      state: state,
      degree: degree,
      positionType: positionType,
      sponsorships: sponsorships,
      interviewing: interviewing,
      filters: []
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  filterChanged = (e, data) =>{
    var filteredData = []
    for(var i = 0;i< masterData.companies.length;i++){
      for(var j = 0; j < data.value.length; j++){
        if(masterData.companies[i][data.name].indexOf(data.value[j]) > -1){
          filteredData.push(masterData.companies[i]);
          break;
        }
      }
    }

    this.setState({
      companies:filteredData
    });

  }

  render() {
    const { activeItem } = this.state;
    return (
      <div className="App">
        <Segment inverted >
            <Header inverted color='grey' as='h2'>
              <Image src={logo} alt="logo" style={{margin:10}}/>
              Welcome to Career Fair Info
              <br />
            </Header>
        </Segment>

          <Grid stackable relaxed columns={3} style={{ padding: 10 }}>
            <Grid.Row>
              <Grid.Column width={3}>

                <Grid.Row>
                    <Menu inverted pointing vertical>
                      <Menu.Item name='Companies' active={activeItem === 'Companies'} onClick={this.handleItemClick} />
                      <Menu.Item name='Graphs' active={activeItem === 'Graphs'} onClick={this.handleItemClick} />
                      <Menu.Item name='Most Wanted' active={activeItem === 'Most Wanted'} onClick={this.handleItemClick} />
                    </Menu>

                </Grid.Row>
                <br/>

                <Grid.Row width={5}>
                    <Header as='h3' attached='top'> Filters </Header>
                    <Segment attached>
                        <Item.Group>
                        Major: <Dropdown name='Majors' placeholder='major' search selection multiple options={this.state.majors} onChange={this.filterChanged} />
                        </Item.Group>
                        <Item.Group>
                        Degree: <Dropdown name='degree_levels' placeholder='Degree' search selection multiple options={this.state.degree} onChange={this.filterChanged} />
                        </Item.Group>
                        <Item.Group>
                        Interviewing: <Dropdown name='field_5' placeholder='Interviewing' search selection multiple options={this.state.interviewing} onChange={this.filterChanged} />
                        </Item.Group>
                        <Item.Group>
                        Location: <Dropdown name='field_3' placeholder='State' search selection multiple options={this.state.state} onChange={this.filterChanged} />
                        </Item.Group>
                        <Item.Group>
                        Sponsorships?: <Dropdown name='work_authorizations' placeholder='Sposorship' search selection multiple options={this.state.sponsorships} onChange={this.filterChanged} />
                        </Item.Group>
                        <Item.Group>
                        Position Type: <Dropdown name='position_types' placeholder='Position Type' search selection multiple options={this.state.positionType} onChange={this.filterChanged} />
                        </Item.Group>
                    </Segment>
              </Grid.Row>
              </Grid.Column>

              <Grid.Column width={8}>
                    <Header as='h2' attached='top'> Companies </Header>
                    {/*<Card.Content header='Companies' extra={this.state.companies.length}/>*/}
                    <Segment attached>
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
                                    <Item.Extra>Majors: {data.majors} <Divider/></Item.Extra>
                                  </Item.Content>
                                </Item>)
                            })
                          }
                        </Item.Group>
                    </Segment>
   
              </Grid.Column>
              
            </Grid.Row>
          </Grid>
      </div>
    );
  }
}

export default App;
