import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window')

const MyRNCalendar = (props) => {
    const currentDate = moment(new Date());
    const [year, setYear] = useState(Number(currentDate.format('YYYY')));
    const [month, setMonth] = useState(Number(currentDate.format('M')));
    const [dateLabels] = useState(['一', '二', '三', '四', '五', '六', '七']);
    const [dayData, setDayData] = useState([]);
    const [color, setColor] = useState([]);
    const [selectedDate, setSelectedDate] = useState(undefined);

    useEffect(() => {
        const dayCount = getDaysOfMonth(year, month)
        const dayIn = getFirstDay(year, month)
        let tempDayData = []
        let tempColor = []
        for (var i = 1; i < dayIn; i++) {
            tempDayData.push(' ');
            tempColor.push(0);
        }
        for (var i = 1; i <= dayCount; i++) {
            tempDayData.push(i);
            tempColor.push(0);
        }
        if (!selectedDate) {
            setSelectedDate(currentDate.format('YYYY-M-D'));
        }
        setDayData(tempDayData);
        setColor(tempColor);
    }, [year, month]);

    const keyExtractor = (item, index) => 'Zdate' + index;

    const clickPrevious = () => {
        let preMonth = month - 1;
        if (preMonth < 1) {
            preMonth = 12;
            const preYear = year - 1;
            setYear(preYear);
        }
        setMonth(preMonth);
    }

    const clickNext = () => {
        let nextMonth = month + 1;
        if (nextMonth > 12) {
            nextMonth = 1;
            let nextYear = year + 1;
            console.log('next year', nextYear);
            setYear(nextYear);
        }
        setMonth(nextMonth);
    }

    const getDaysOfMonth = (year, month) => {
        const day = new Date(year, month, 0);
        const dayCount = day.getDate();
        return dayCount;
    }

    const getFirstDay = (year, month) => {
        const day = new Date(year, month - 1);
        let dayCount = day.getDay();
        if (dayCount == 0) {
            dayCount = 7;
        }
        return dayCount;
    }

    const createHeaderBar = () => {
        return (
            <View style={{
                height: 50,
                width: width,
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ marginLeft: 10 }}
                    onPress={clickPrevious}>
                    <Text style={{
                        fontSize: 14,
                        color: '#9EA3AD',
                    }}>&lt;上个月</Text>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 16,
                    color: '#243047'
                }}>
                    {year + '年' + month + '月'}
                </Text>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ marginRight: 10 }}
                    onPress={clickNext}>
                    <Text style={{
                        fontSize: 14,
                        color: '#9EA3AD',
                    }}>下个月&gt;</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const createDayBar = () => {
        return (
            <View style={{
                height: 40,
                width: width,
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                {dateLabels.map((item, index) => {
                    return <View
                        key={index}
                        style={{
                            width: width / 7,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#FFFFFF'
                        }}>
                        <Text style={{
                            color: '#243047',
                            fontSize: 16
                        }}>
                            {item}
                        </Text>
                    </View>
                })}
            </View>
        )
    }

    const creatContent = () => {
        return (
            <FlatList
                data={dayData}
                numColumns={7}
                horizontal={false}
                renderItem={renderItem}
                keyExtractor={keyExtractor} />
        )
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => clickItem(item, index)}
            >
                <View
                    style={{
                        width: width / 7,
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,  //圆角5
                        borderWidth: 1,
                        borderColor: 'white',
                        backgroundColor: (year + '-' + month + '-' + item) === selectedDate ? '#3576F0' : 'white',

                    }}>
                    <Text
                        style={{ color: (year + '-' + month + '-' + item) === selectedDate ? 'white' : '#243047' }}>{item}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const clickItem = (item, index) => {
        if (item == ' ') {
            return;
        }
        let tempColor = color
        if (tempColor[index] == 1) {
            tempColor[index] = 0;
        }
        else if (tempColor[index] == 0) {
            tempColor[index] = 1;
        }
        setColor(tempColor);
        const selectedDate = year + '-' + month + '-' + item;
        setSelectedDate(selectedDate);
        props.onChangeDate(selectedDate);
    }

    return (
        <View style={styles.modalStyle}>
            <View style={styles.subView}>
                <View style={styles.canlendarStyle}>
                    {createHeaderBar()}
                    <View style={{
                        width: '100%',
                        height: 0.5,
                        alignSelf: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#dddddd',
                    }} />
                    {createDayBar()}
                    {creatContent()}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalStyle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    subView: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        width: width,
        backgroundColor: '#fff'
    },
    canlendarStyle: {
        width: width,
        height: 310,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopColor: '#cccccc',
        borderTopWidth: 0.5,
        backgroundColor: 'white',
    },
    actionItemTitle: {
        fontSize: 18,
        color: 'blue',
        textAlign: 'center',
    },
});

export default MyRNCalendar;