import React, { useState, useEffect } from 'react';
import { Text,StyleSheet, TouchableOpacity, View, Image, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Dice1 from "../images/dice1.png";
import Dice2 from "../images/dice2.png";
import Dice3 from "../images/dice3.png";
import Dice4 from "../images/dice4.png";
import Dice5 from "../images/dice5.png";
import Dice6 from "../images/dice6.png";

const Dice = props => {
	const [subscription, setSubscription] = useState(null);
    const [randomNumber, setRandomNumber] = useState();
	const [image,setImage] = useState(Dice1);
	const [player1, setPlayer1] = useState([]);
	const [player2, setPlayer2] = useState([]);
	var random = 0;
	const [value1,setValue1] = useState(0);
	const [value2,setValue2] = useState(0);
	const _subscribe = () => {
		Accelerometer.setUpdateInterval(400);

		setSubscription(
			Accelerometer.addListener(accelerometerData => {
				let movement = Math.sqrt(accelerometerData.x * accelerometerData.x + accelerometerData.y * accelerometerData.y + accelerometerData.z * accelerometerData.z);

				if (movement > 1.7) {
                    var maxNumber = 6;
                    setRandomNumber(Math.floor((Math.random() * maxNumber) + 1));
					random = Math.floor((Math.random() * maxNumber) + 1);
					switch(random){
						case 1: setImage(Dice1);
							break;
						case 2: setImage(Dice2);
							break;
						case 3: setImage(Dice3);
							break;
						case 4: setImage(Dice4);
							break;
						case 5: setImage(Dice5);
							break;
						case 6: setImage(Dice6);
							break;
					}
					console.log("random:"+ random)
					console.log("image:"+ image);
					console.log("------------------------------------------")
					if(player1.length == player2.length){
						player1.push(random);
					}
					else{
						player2.push(random)
					}
					var value = 0;
					player1.forEach(element => {
						value += element;
					});
					setValue1(value);
					var valuee = 0;
					player2.forEach(element => {
						valuee += element;
					});
					setValue2(valuee);
					console.log(player1);
					console.log(player2);
				}
			})
		);
	};

	const reset = () => {
		player1.splice(0,player1.length);
		console.log("sracka" + player1)
		player2.splice(0,player2.length);
		setValue1(0);
		setValue2(0);
		console.log("reset");
		setImage(Dice1);
	}
	const playing = () => {
		var a = "Player 1";
		var b = "Player 2";
		if(player1.length == player2.length){
			return(a);
		}
		else{
			return(b);
		}
	}

	const _unsubscribe = () => {
		subscription && subscription.remove();
		setSubscription(null);
	};	

	useEffect(() => {
		_subscribe();
		return () => _unsubscribe();
	}, []);

	return (
		<View>
			<Text style={styles.h1}>{(player1.length == player2.length) ? "Player 1 is playing" : "Player 2 is playing"}</Text>
			<Text style={styles.rolltext}>Move with your phone to roll!</Text>
			<Image style={styles.image} source= {image}/>
			<Text style={styles.textplay1}>Player 1: {value1}</Text>
			<Text style={styles.textplay2}>Player 2: {value2}</Text>
			<Button style={styles.button}  onPress={reset}
  					title="Reset"
  					color="#FF0000"></Button>
        </View>
	);
}
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	image:{
		width:300,
		height:300
	},
	rolltext:{
		textAlign: 'center',
		margin: 10,
		fontSize: 20

	},
	button:{
		alignItems: 'baseline',
		justifyContent: 'center'
	},
	textplay1:{
		margin: 20,
		fontSize: 20,
		color: 'blue'
	},
	textplay2:{
		margin: 20,
		fontSize: 20,
		color: 'green'
	
	},
	h1:{
		fontSize: 35,
		textAlign: 'center'
	}
  })


export default Dice;