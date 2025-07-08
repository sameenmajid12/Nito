import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, FONT_FAMILY_SEMIBOLD, FONT_SIZE_XS } from '../../styles'; 

function CustomTabBar({ state, descriptors, navigation, opacity }) {
  
  return (
    <Animated.View style={[styles.tabBarContainer, {opacity:opacity}]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;
        if (route.name === 'HomeTab') { 
          iconName = 'home' ;
        } else if (route.name === 'ChatTab') {
          iconName = 'chatbubbles';
        } else if (route.name === 'ProfileTab') {
          iconName ='person';
        }

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {isFocused && <View style={styles.activeIndicator} />}
            <Ionicons
              name={iconName}
              size={26}
              color={isFocused ? colors.blue : colors.blue50}
              style={isFocused && styles.activeIcon}
            />
            <Text
              style={[
                styles.tabLabel,
                isFocused?{color:colors.blue, fontFamily:"Nunito-Bold"}:{color:colors.blue50, fontFamily:"Nunito-SemiBold"}
              ]}
            >
              {label === 'HomeTab' ? 'Home' : label === 'ChatTab' ? 'Chat' : label === 'ProfileTab' ? 'Profile' : label}
            </Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    paddingHorizontal:30,
    backgroundColor:colors.background,
    borderWidth:1,
    borderColor:colors.blue50,
    borderRadius: 999, 
    marginHorizontal: 40, 
    marginBottom: 40, 
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%"
  },
  tabLabel: {
    fontSize: FONT_SIZE_XS,
    
  },
  activeIndicator: {
    position: 'absolute',
    top: -1,
    width: 50, 
    height: 3,
    backgroundColor: colors.blue, 
    borderRadius: 5,
  },
});

export default CustomTabBar;