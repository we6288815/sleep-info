import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MyStarScope = (props) => {
    const starArr = [1, 2, 3, 4, 5];
    return (
        <View style={styles.container}>
            {
                starArr.map((item, index) => {
                    return <Text
                        style={styles.star}
                        onPress={() => props.onChangeStar(item)}
                    >
                        {item <= props.star ? '★' : '☆'}
                    </Text>
                })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    star: {
        color: "#FFAC2D",
        fontSize: 20,
    }
});

export default MyStarScope;