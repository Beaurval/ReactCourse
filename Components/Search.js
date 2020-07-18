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

        this.searchedText = "";
        this.page = 0;
        this.totalPages = 0;
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

    _searchFilms(){
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films : []
        },()=>{
            this._LoadFilms();
        });

    }


    _LoadFilms() {
        this.setState({isLoading: true});
        if (this.searchedText.length > 0)
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1)
                .then((data => {
                    this.page = data.page;
                    this.totalPages = data.total_pages;
                        this.setState(
                            {
                                films: [...this.state.films,...data.results],
                                isLoading: false
                            }
                        )
                    })
                )
            ;

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
                    this._searchFilms();
                }}/>
                <FlatList
                    data={this.state.films}
                    renderItem={({item}) => <FilmItem film={item}/>}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages)
                        {
                            this._LoadFilms()
                        }
                    }}
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
        backgroundColor: 'white'
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
