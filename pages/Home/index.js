import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    Button, Dimensions,









    PixelRatio, SafeAreaView,






    ScrollView, StyleSheet, Text, TextInput,


    View
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MyRNCalendar from '../../components/MyRNCalendar';
import MyStarScope from '../../components/MyStarScope';

const { width, height } = Dimensions.get('window')
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
    return (
        <>
            <SafeAreaView>
                <ScrollView >
                    <MyRNCalendar
                        onChangeDate={(date) => {
                            setSelectedDate(date);
                        }}
                    />
                    <View style={{ height: 10, backgroundColor: '#9EA3AD' }}></View>
                    <View style={styles.formView}>
                        <View style={styles.rowView} >
                            <View style={styles.cellView}>
                                <Text style={styles.textInputTitle}>评分</Text>
                            </View>
                            <View style={styles.cellView}>
                                <MyStarScope star={ratioStar} onChangeStar={(value) => {
                                    setRatioStar(value);
                                    setNeedSave(true);
                                }} />
                            </View>
                        </View>
                        <View style={styles.rowView} >
                            <View style={styles.cellView}>
                                <Text style={styles.textInputTitle}>评价</Text>
                            </View>
                            <View style={styles.cellView}>
                                <TextInput
                                    // style={styles.textMultilineInput}
                                    value={description}
                                    placeholder={"请输入评价"}
                                    multiline
                                    numberOfLines={5}
                                    onChangeText={(value) => {
                                        setDescription(value);
                                        setNeedSave(true);
                                    }}
                                />
                            </View>
                        </View>
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
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    formView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: "center",
    },
    rowView: {
        flexDirection: 'row',
        minHeight: 40,
        marginRight: 15,
        marginLeft: 15,
        borderBottomWidth: 0.5 / PixelRatio.get(),
        borderColor: 'gray',//需要标色
    },
    cellView: {
        justifyContent: 'center',
    },
    textInputTitle: {
        width: 50,
        fontSize: 13,
    },
    textInput: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    textMultilineInput: {
        height: 200,
    }
});


export default Home;