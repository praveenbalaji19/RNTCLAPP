/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';


const Section = (props) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.flexRow}>
                <Image source={{ uri: props.item.avatar }} style={styles.avatar} />
                <View style={{ paddingLeft: 10 }}>
                    <Text
                        style={[styles.sectionTitle]}>
                        {props.item.first_name}
                    </Text>
                    <Text
                        style={[styles.sectionDescription]}>
                        {props.item.email}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const App = (props) => {
    const [loader, setLoader] = useState(true)
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {

        fetch("https://reqres.in/api/users").then(resp => resp.json()).then(res => {
            if (res.data && res.data.length > 0) {
                props.setUserData({
                    data: res.data,
                    type: "SET_USER_LIST"
                })
                setLoader(false)
            } else {
                setLoader(false)
            }
        }).catch(err => {
            console.log("err", err)
            setLoader(false)
        })
    }, [])

    const { userList } = props.data.userReducer
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {userList?.length > 0 ?
                <FlatList
                    data={userList}
                    renderItem={({ item }) => {
                        return (<Section item={item} />)
                    }} />
                :
                <Text>No data Found</Text>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    cardContainer: {
        width: "90%",
        marginLeft: "5%",
        borderWidth: 1,
        borderColor: "grey",
        padding: 10
    },
    flexRow: {
        flexDirection: 'row'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40
    }
});

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (data) => { dispatch(data) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
