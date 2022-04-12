import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';



Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

export default function getPushToken() {
    if (!Constants.isDevice) {
        return Promise.reject('Must use physical device for Push Notifications');
    }

    try {
        return Notifications.getPermissionsAsync()
            .then((statusResult) => {
                return statusResult.status !== 'granted'
                    ? Notifications.requestPermissionsAsync()
                    : statusResult;
            })
            .then((statusResult) => {
                if (statusResult.status !== 'granted') {
                    throw 'Failed to get push token for push notification!';
                }
                return Notifications.getDevicePushTokenAsync();
            })
            .then((tokenData) => tokenData.data);
    } catch (error) {
        return Promise.reject("Couldn't check notifications permissions");
    }
};
