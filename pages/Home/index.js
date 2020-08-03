import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    PixelRatio,
    TextInput,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';
import MyRNCalendar from '../../components/MyRNCalendar';

const Home = () => {
    const currentDate = moment(new Date());
    const [selectedDate, setSelectedDate] = useState(currentDate.format('YYYY-M-D'));
    const [needSave, setNeedSave] = useState(false);
    const [ratioStar, setRatioStar] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        if (selectedDate) {
            storage.load({
                key: 'sleepInfos',
                id: selectedDate
            }).then(res => {
                setRatioStar(res.ratioStar);
                setDescription(res.description);
            }).catch(err => {
                console.log('load data error: ', err);
                setRatioStar(undefined);
                setDescription(undefined);
            });
        }
    }, [selectedDate]);
    // const myRNCalendarRef = useRef();
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <MyRNCalendar
                        onChangeDate={(date) => {
                            console.log('select date:', date);
                            setSelectedDate(date);
                        }}
                    />
                    <View style={{
                        marginTop: 10,
                    }}>
                        <View style={styles.rowView} >
                            <Text style={styles.textInputTitle}>评分</Text>
                            <TextInput value={ratioStar} onChangeText={(value) => {
                                setRatioStar(value);
                                setNeedSave(true);
                            }}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.rowView} >
                            <Text style={styles.textInputTitle}>评价</Text>
                            <TextInput value={description} onChangeText={(value) => {
                                setDescription(value);
                                setNeedSave(true);
                            }} multiline style={styles.textMultilineInput} />
                        </View>
                        <Button title="保存" disabled={!needSave}
                            onPress={() => {
                                const sleepInfo = {
                                    date: selectedDate,
                                    ratioStar: ratioStar,
                                    description: description,
                                }
                                storage.save({
                                    key: 'sleepInfos',
                                    id: selectedDate,
                                    data: sleepInfo
                                });
                                setNeedSave(false);
                            }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 100,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    rowView: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        marginRight: 15,
        marginLeft: 15,
        //paddingTop:15,  
        borderBottomWidth: 0.5 / PixelRatio.get(),
        borderColor: 'gray',//需要标色
    },
    textInputTitle: {
        width: 80,
        fontSize: 13,
        //color: '#333',  
        //backgroundColor: 'red',  
    },
    textInput: {
        flex: 1,
        height: 44,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    textMultilineInput: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    }
});


export default Home;