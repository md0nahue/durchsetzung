import React, { Component } from 'react';
import { Alert, AppRegistry, FlatList, Text, TextInput, Button, StyleSheet, View, ActivityIndicator } from 'react-native';

export default class ButtonBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
    body: '',
    isLoading: true };
    this.submitComment = this.submitComment.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.commentPresenter = this.commentPresenter.bind(this);
  }

  componentDidMount(){
    this.fetchComments()
  }

  commentPresenter(item){
    return(
    <View>
      <Text>{item.name}: {item.body}</Text>
      <Button onPress={() => this.removeComment(item.id)} title="delete" />
    </View>
    )
  }

  fetchComments(){
    return fetch('http://localhost:3000/comments.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  removeComment(id) {
    fetch( "http://localhost:3000/comments/" + id , {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      }),
    }).then((responseJson) => {
      this.fetchComments();
    });

    this.setState({name: '', body: '' });
  }

  submitComment() {
    fetch('http://localhost:3000/comments/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        body: this.state.body,
      }),
    }).then((responseJson) => {
      this.fetchComments();
    });

    this.setState({name: '', body: '' });
  }


  render() {
    return (
      <View style={styles.container}>
      <View style={{padding: 10}}>
      <FlatList
      data={this.state.dataSource}
      renderItem={({item}) => this.commentPresenter(item) }
      keyExtractor={({id}, index) => id.toString()}
      />
      <TextInput
      style={{height: 40}}
      placeholder="Name"
      value={this.state.name}
      onChangeText={(name) => this.setState({name})}
      />
      <TextInput
      style={{height: 40}}
      placeholder="Body"
      value={this.state.body}
      onChangeText={(body) => this.setState({body})}
      />
      <Button
      onPress={this.submitComment}
      title='Submit'
      />
      </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'white',
  }
});