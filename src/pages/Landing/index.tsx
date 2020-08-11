import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png'

function Landing() {

    const [totalConnectionns, setTotalConnectionns] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            api.get('connections').then((response: any)=> {
                const { total } = response.data;
                setTotalConnectionns(total);
            });
        }, [])
    );
    
    const { navigate } = useNavigation();

    function handleNavigationToGiveClassPage() {
        navigate('GiveClasses')
    }

    function handleNavigationToStudyPages() {
        navigate('Study')
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />
            <Text style={styles.title}>
                Seja Bem Vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton
                    onPress={handleNavigationToStudyPages}
                    style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                    onPress={handleNavigationToGiveClassPage}
                    style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar Aula</Text>
                </RectButton>
            </View>
            <Text style={styles.totalConnections}>
                Total de {totalConnectionns} conexões ja realizadas {' '}
                <Image source={heartIcon} />
            </Text>

        </View>
    )
}

export default Landing;