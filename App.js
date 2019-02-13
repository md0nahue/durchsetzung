import React, { Component } from 'react';
import { Alert, AppRegistry, FlatList, Text, Button, StyleSheet, View } from 'react-native';

export default class ButtonBasics extends Component {
    constructor(props) {
    super(props);
    this.state = { score: 0,
                   actions: [],
                   gold: 0 };
    this.onPressButton = this.onPressButton.bind(this);
    this.showList = this.showList.bind(this);
    this.mineGold = this.mineGold.bind(this);
    this.updateGold = this.updateGold.bind(this); 
    this.goFish = this.goFish.bind(this);
    this.playPoker = this.playPoker.bind(this);  
  }

showList = () =>{
 return <FlatList
          data={ this.state.actions }
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
  }

  updateGold(gold, message) {
      this.setState(previousState => (
        { gold: previousState.gold + gold,
          actions: previousState.actions.concat([ { key: message + Math.random().toString(36).substring(4, 8) } ]) }
      ))
      if(this.state.actions.length > 2){
        this.state.actions = this.state.actions.slice(1 , 3)
      }
  }

  mineGold() {
      let minedGold = Math.floor(Math.random() * 8);
      this.updateGold(minedGold, "You mined " + minedGold + " gold! ")
  }

  goFish() {
      let fishedGold = Math.floor(Math.random() * 11);
      this.updateGold(fishedGold, "You found " + fishedGold + " gold in the pond! ")
  }

  playPoker() {
      let pokerGold = Math.floor(Math.random() * 30);
      this.updateGold(pokerGold, "You won " + pokerGold + " gold at Texas Hold 'Em! ")
  }

  onPressButton() {
      this.setState(previousState => (
        { score: previousState.score + 1 }
      ))
  }

  render() {
    return (
    
      <View style={styles.container}>
      {this.showList()}
        <View style={styles.buttonContainer}>
          <Button
            title={"Gold: " + this.state.gold.toString()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.mineGold}
            title="Mine Gold"
            color="#841584"
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this.goFish}
            title="Go Fish"
          />
          <Button
            onPress={this.playPoker}
            title="Play Poker"
            color="#841584"
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
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    padding: 10,
    color: 'white',
    fontSize: 18,
    height: 44,
  }
});