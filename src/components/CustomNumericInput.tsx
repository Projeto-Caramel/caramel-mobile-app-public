import React, { useRef, useState } from 'react';
import { VStack, Input, IInputProps } from 'native-base';
import { Theme } from '../styles/Theme';

interface NumericCodeInputProps extends IInputProps {
  length: number;
}

const NumericCodeInput = ({ length, ...rest }: NumericCodeInputProps) => {
  const [digits, setDigits] = useState(Array(length).fill(''));
  const inputsRef = useRef<Array<any>>([]);

  const handleChangeText = (text: string, index: number) => {
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    if (text && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    if (!text && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <VStack direction="row" space={2}>
      {digits.map((digit, index) => (
        <Input
          key={index}
          ref={el => (inputsRef.current[index] = el)}
          onChangeText={text => handleChangeText(text, index)}
          value={digit}
          variant="underlined"
          keyboardType="numeric"
          maxLength={1}
          textAlign="center"
          fontSize={Theme.fontSizes.xl}
          width="auto" 
          borderBottomColor={Theme.colors.sealBrown.original} 
          {...rest}
        />
      ))}
    </VStack>
  );
};

export default NumericCodeInput;
