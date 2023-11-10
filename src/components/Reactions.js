import React from 'react';
import { View, Modal, Text, TouchableOpacity, FlatList, StyleSheet, PixelRatio } from 'react-native';

const Reactions = ({ modalVisible, setModalVisible, showPositiveEmojis, toggleLikeDislike, emojisToShow, margBot, margLeft}) => {
    const pixelRatio = PixelRatio.get();

    const baseFontSize = 12;
    const fontSize = baseFontSize * pixelRatio;

    const smallFontSize = 11;
    const fontSize2 = smallFontSize * pixelRatio;

    const padding = 5 * pixelRatio;

    return (
        <Modal
        keyboardShouldPersistTaps="handled" 
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        duration={20}
        style={{ position: 'absolute' }}
        onRequestClose={() => {
            setModalVisible(false);
        }}
        >
        <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            onPress={() => setModalVisible(false)}
        >
            <View style={[PlayerStyles.modalContainer, { marginBottom: margBot, marginLeft: margLeft}]}>
                <View style={PlayerStyles.emojiToggleContainer}>
                    <TouchableOpacity onPress={toggleLikeDislike} style={PlayerStyles.emojiToggleContainer}>
                    <Text style={[PlayerStyles.emojiToggleText, {fontSize2}, {padding}, showPositiveEmojis ? PlayerStyles.activeEmoji : {}]}>                    
                        👍
                    </Text>
                    <Text style={[PlayerStyles.emojiToggleText, {fontSize2}, {padding}, !showPositiveEmojis ? PlayerStyles.activeEmoji : {}]}>
                        👎
                    </Text>
                    </TouchableOpacity>
                </View>
            <FlatList overScrollMode='never'
                style={PlayerStyles.flatList}
                data={emojisToShow}
                numColumns={4}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                    console.log(item);
                    setModalVisible(false);
                }} style={PlayerStyles.item}>
                    <Text style={[PlayerStyles.itemEmoji, { fontSize }]}>{item}</Text>
                </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
            />
            </View>
        </TouchableOpacity>
        </Modal>
    );
};

export default Reactions;

const PlayerStyles = StyleSheet.create({       
    emojiToggleContainer: {
        alignItems: 'center',
        marginVertical: 7,
        flexDirection: 'row',
        width: 100,
        height: 40,
        borderRadius: 200,
        backgroundColor: '#404040',
        justifyContent: 'space-between',
    },
    modalContainer:{
        height: 230,
        width: 160,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#2f2f2f',
        borderRadius: 30,
        elevation: 15,
        padding: 6
    },
    emojiToggleText: {        
        color: 'white', // Cambia el color del texto al seleccionar
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
    }, 
    activeEmoji: {
        borderRadius: 200,        
        backgroundColor: '#606060',
        elevation: 3,
        zIndex: 100,      
        width: 40,
        height: 40,  
        color: 'white', // Cambia el color del texto al seleccionar
    },  
    flatList:{
        display: 'flex',
        paddingVertical: 10,
        width: '100%',
        paddingHorizontal: 2
    },
    item:{
        width: 32.8,
        height: 32.8,
        backgroundColor: '#505050',
        borderRadius: 500,
        elevation: 5,
        zIndex: 10000,
        margin: '1%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 10
    },
    itemEmoji:{
    },
});