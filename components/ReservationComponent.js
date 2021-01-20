import React, { Component } from 'react';
import { Text, TextInput, View, ScrollView, StyleSheet, Switch, Modal } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-community/picker';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showDateTimePicker: false,
            showModal: false,
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleDateTimePicker = () => {
        this.setState({showDateTimePicker: !this.state.showDateTimePicker});
    }

    onConfirmDateTimePicker = (date) => {
        this.setState({date: date.toISOString()});
        this.toggleDateTimePicker();
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation = () => {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }
    
    render() {
        return(
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <Button
                        icon={
                            <Icon
                                name='calendar'
                                type='font-awesome'            
                                size={24}
                            />
                        }
                        type="clear"
                        onPress={() => this.toggleDateTimePicker()}
                    />
                    <TextInput
                        defaultValue={this.state.date === '' ? 'select date and time' : this.state.date}
                        style={{ backgroundColor: '#FFF' }}  
                        editable={false}
                        maxLength={20}
                    />  
                    <DateTimePickerModal
                        isVisible={this.state.showDateTimePicker}
                        mode="datetime"
                        onConfirm={this.onConfirmDateTimePicker}
                        onCancel={() => this.toggleDateTimePicker()}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        buttonStyle={{backgroundColor: '#512DA8'}}
                        />
                </View>
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            buttonStyle={{backgroundColor: '#512DA8'}}
                            title="Close" 
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'stretch',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
     modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;