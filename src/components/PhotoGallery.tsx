import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ImageSourcePropType } from "react-native";
import { Box, Image, IconButton, Icon, HStack } from "native-base";
import Swiper from "react-native-swiper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from "../styles/Theme";

const { width } = Dimensions.get("window");

type PhotoGalleryProps = {
  images: ImageSourcePropType[]; // Imagens em Base64 sem o prefixo MIME
};

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const swiperRef = useRef<any>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Swiper
        ref={swiperRef}
        loop
        autoplay={false}
        showsPagination={true}
        paginationStyle={{ bottom: 10 }}
        dotStyle={{ backgroundColor: Theme.colors.sealBrown.original }}
        activeDotStyle={{ backgroundColor: "#FF0000" }}
        containerStyle={{ height: 600 }}
      >
        {images.map((imageBase64, index) => (
          <Image
            key={index}
            source={imageBase64} // Teste sem o prefixo
            alt={`Image ${index}`}
            width={width}
            height={600}
            resizeMode="cover"
            borderRadius={10}
          />
        ))}
      </Swiper>

      <HStack
        justifyContent="space-between"
        position="absolute"
        width="100%"
        top="50%"
        px={3}
      >
        <IconButton
          icon={
            <Icon as={Ionicons} name="chevron-back" size="lg" color="white" />
          }
          onPress={() => swiperRef.current.scrollBy(-1)}
          variant="unstyled"
        />
        <IconButton
          icon={
            <Icon
              as={Ionicons}
              name="chevron-forward"
              size="lg"
              color="white"
            />
          }
          onPress={() => swiperRef.current.scrollBy(1)}
          variant="unstyled"
        />
      </HStack>
    </Box>
  );
}
