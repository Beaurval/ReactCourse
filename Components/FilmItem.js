import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {getImageFromApi} from "../API/TMDBApi";

class FilmItem extends React.Component {

    render() {
        const film = this.props.film;
        return (

            <View style={styles.main_container}>
                <Image source={{uri: getImageFromApi(film.poster_path)}} style={styles.image}/>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={6} style={styles.description}>{film.overview}</Text>
                    </View>
                    <View>
                        <Text style={styles.date}>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        width: 300,
        flexDirection: 'row',
        marginBottom: 25

    },
    content: {
        flexDirection: 'column'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 210

    },
    image: {
        width: 100,
        backgroundColor: 'grey'
    },
    title_text: {
        width: 180,
        fontWeight: 'bold'
    },
    vote_text: {
        fontWeight: 'bold',
        color:'grey',
        width:40
    },
    description: {
        height: 140,
        fontSize: 12,
        color: 'grey',
        marginTop: 10
    },
    date: {
        textAlign: 'right',
        width: 200
    }
});

export default FilmItem
