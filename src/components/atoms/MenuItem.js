import * as React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PlatformColor,
} from "react-native";
import {
  DrawerItem
} from '@react-navigation/drawer';

const Item = ({ label, onPress, image }) => {
  console.log(image);
  // const dimensions = useWindowDimensions();
  return (
    <TouchableOpacity onPress={ onPress } style={styles.tabContainer}>
      <Image source={image} style={image == 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE8SURBVHgBtVOLccIwDH30OkA2wBuUDcgIjOANSicoI7AB2SDtBGGEboA7AekEqdyTy4uxg3Mc7+6dP7L1JFleII9KuBEaXTdCRzaro1PbLKyEJ+EQ8Z3ONLR/okBuwpDzs/Ag7MjZloIYIpGqRMBmotqTaECc5TZ29pQQqHX8xKXmQQAa5VLnLrr7ggKBXsdltM/p/yCN3P4INdL1DuXo6OwZ4xJtUIgW1x0U6m/0jI1sB8zEPnLQaSYB3Gk7FHZQCgbpHq90f9LxInOxFq7JiceX8Ft41Dljpee8rUcGNcYfaoq+PK9I/xPvw3IGPsoWl/6HRnHUiHvKbI3xOzjhm/BD7fybG7X9vT53Qo1pGI2QH9mobYfrxvhfWMxDRSLhv9hIYHimC31B9DG4fEmwQIsHwAs43I+eRseGX/8EfHsSxlJ6AAAAAElFTkSuQmCC' ? styles.specialIcon : styles.floorIcon}/>
      <Text style={styles.drawerItem}>{ label }</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  drawerItem: {
    ...Platform.select({
      ios: {
        width: 150,
        color: '#0E1F12',
        paddingLeft: 12
       },
      android: {
        width: 150,
        color: '#0E1F12',
        paddingLeft: 12
      },
      default: {
        color: '#0E1F12',
        paddingLeft: 12
      }
    })
  },
  floorIcon: {
    width: 19,
    height: 24
  },
  specialIcon: {
    ...Platform.select({
      ios: {
       },
      android: {
      },
      default: {
        width: 24,
        height: 17.45
      }
    })
  }
});
export default Item;
