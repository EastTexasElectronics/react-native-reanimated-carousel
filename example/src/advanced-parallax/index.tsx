import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from '../../../src/index';
import type { TAnimationStyle } from '../../../src/layouts/BaseLayout';
import { SBItem } from '../components/SBItem';

const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;

function Index() {
    const animationStyle: TAnimationStyle = React.useCallback(
        (value: number) => {
            'worklet';

            const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
            const translateX = interpolate(
                value,
                [-2, 0, 1],
                [-PAGE_WIDTH, 0, PAGE_WIDTH]
            );

            return {
                transform: [{ translateX }],
                zIndex,
            };
        },
        []
    );

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop={true}
                style={{ width: PAGE_WIDTH, height: 240 }}
                width={PAGE_WIDTH}
                autoPlayInterval={1500}
                data={[...new Array(6).keys()]}
                renderItem={({ index, animationValue }) => {
                    return (
                        <CustomItem
                            key={index}
                            index={index}
                            animationValue={animationValue}
                        />
                    );
                }}
                customAnimation={animationStyle}
            />
        </View>
    );
}

interface ItemProps {
    index: number;
    animationValue: Animated.SharedValue<number>;
}
const CustomItem: React.FC<ItemProps> = ({ index, animationValue }) => {
    const maskStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            animationValue.value,
            [-1, 0, 1],
            ['#000000dd', 'transparent', '#000000dd']
        );

        return {
            backgroundColor,
        };
    }, [animationValue]);

    return (
        <View style={{ flex: 1 }}>
            <SBItem key={index} index={index} style={{ borderRadius: 0 }} />
            <Animated.View
                pointerEvents="none"
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    },
                    maskStyle,
                ]}
            />
        </View>
    );
};

export default Index;
