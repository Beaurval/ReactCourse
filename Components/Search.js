import React from 'react';
import {View, TextInput, Button, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import FilmItem from '../Components/FilmItem'

import {getFilmsFromApiWithSearchedText} from "../API/TMDBApi";


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            isLoading: false
        };

        this.searchedText = ""
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loadingIndicator}>
                    <ActivityIndicator size={"large"}/>
                </View>
            )
        }
    }

    _LoadFilms() {
        this.setState({isLoading: true});
        if (this.searchedText.length > 0)
            getFilmsFromApiWithSearchedText(this.searchedText)
                .then((data => this.setState(
                    {
                        films: data.results,
                        isLoading: false
                    }
                )));

    }

    _SearchTextInputChanged(text) {
        this.searchedText = text;
    }

    render() {
        console.log(this.state.isLoading);
        return (

            <View style={styles.mainContainer}>
                <TextInput onSubmitEditing={() => this._LoadFilms()}
                           onChangeText={data => this._SearchTextInputChanged(data)} style={styles.textinput}
                           placeholder='Titre du film'/>
                <Button title='Rechercher' onPress={() => {
                    this._LoadFilms();
                }}/>
                <FlatList
                    data={this.state.films}
                    renderItem={({item}) => <FilmItem film={item}/>}
                    keyExtractor={(item) => item.id.toString()}
                />
                {this._displayLoading()}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    textinput: {
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 5,
        height: 50,

    },
    mainContainer: {
        flex: 1,
        marginTop: 40
    },
    loadingIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Search
