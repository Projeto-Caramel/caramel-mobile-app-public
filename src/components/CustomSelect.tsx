import React, { useState, useEffect } from "react";
import { View, Select, ISelectProps, Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from '../styles/Theme';

interface CustomSelectProps extends ISelectProps {
  iconName?: string;
  placeholder: string;
  items: { label: string; value: string }[]; 
  initialValue?: string; 
}

const CustomSelect = ({
  iconName,
  placeholder,
  items,
  initialValue, 
  ...rest
}: CustomSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(initialValue); 

  useEffect(() => {
    if (initialValue) {
      setSelectedValue(initialValue);
    }
  }, [initialValue]);

  return (
    <View
      mt={5}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: Theme.colors.sealBrown.original,
        paddingVertical: 5,
      }}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          style={{
            color: Theme.colors.sealBrown.original,
            fontSize: Theme.fontSizes.lg,
            marginRight: 10,
          }}
        />
      )}
      <Select
        variant="unstyled"
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.sealBrown.original}
        selectedValue={selectedValue} 
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);  
          rest.onValueChange && rest.onValueChange(itemValue);  
        }}
        dropdownIcon={<Icon as={Ionicons} name="chevron-down" size="sm" color="white" />}
        _selectedItem={{
          bg: Theme.colors.sealBrown.original,
          borderRadius: 100,
          _text: {
            color: "white",  
            fontWeight: "bold", 
          },
          endIcon: <Icon as={Ionicons} name="paw" size="5" color="white" />,  
        }}
        flex={1}
        fontSize={Theme.fontSizes.lg}
        color={Theme.colors.sealBrown.original}
        {...rest}
      >
        {items.map((item) => (
          <Select.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Select>
    </View>
  );
};

export default CustomSelect;
