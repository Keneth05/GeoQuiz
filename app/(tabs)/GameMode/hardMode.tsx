import HardModeCard from '@/components/HardModeCard'
import React from 'react'
import { View } from 'react-native'

const HardMode = () => {
    return (
        <View className='h-full flex justify-center p-5 bg-AppBackground'>
            <HardModeCard/>
        </View>
    )
}

export default HardMode