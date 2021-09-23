import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import {COLORS, SIZES, Theme} from '../../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {Context as ProductContext} from '../../context/productContext';
import {Item} from '../../utils/interfaces';

interface ProductCardProps {
  item: Item;
  isBag?: boolean;
}

const ProductCard = ({item, isBag}: ProductCardProps) => {
  const {state, addWishlist, removeWishlist, addToBag, removeToBag} =
    useContext(ProductContext) as any;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isInBag, setIsInBag] = useState<boolean>(false);

  useEffect(() => {
    if (state) {
      const isAlreadyFavorite = state.wishlist.find(
        (product: Item) => product.id === item.id,
      );
      const isAlreadyIntoBag = state.bags.find(
        (product: Item) => product.id === item.id,
      );
      if (isAlreadyFavorite) {
        setIsFavorite(true);
      }
      if (isAlreadyIntoBag) {
        setIsInBag(true);
      }
    }
  }, [state]);

  const OnFavorite = (data: Item) => {
    if (isFavorite) {
      const index = state.wishlist.findIndex(
        (product: Item) => product.id === data.id,
      );
      const wishList = [...state.wishlist];
      wishList.splice(index, 1);
      setIsFavorite(false);
      removeWishlist(wishList);
    } else {
      setIsFavorite(true);
      addWishlist([...state.wishlist, data]);
    }
  };

  const AddToBag = (data: Item) => {
    if (isInBag) {
      const index = state.bags.findIndex(
        (product: Item) => product.id === data.id,
      );
      const bags = [...state.bags];
      bags.splice(index, 1);
      setIsInBag(false);
      removeToBag(bags);
    } else {
      setIsInBag(true);
      addToBag([...state.bags, {...data, quantity: 1}]);
    }
  };

  const pressIncrease = (count: number) => {
    const index = state.bags.findIndex(
      (product: Item) => product.id === item.id,
    );

    const isCount = [...state.bags];
    isCount[index].quantity = count;

    addToBag(isCount);
  };

  const pressDecrease = (count: number) => {
    if (count >= 1) {
      const index = state.bags.findIndex(
        (product: Item) => product.id === item.id,
      );

      const isCount = [...state.bags];
      isCount[index].quantity = count;

      addToBag(isCount);
    }
  };

  return (
    <TouchableOpacity disabled={true} style={styles.container}>
      <Image
        source={{
          uri: item.img,
        }}
        style={styles.img}
      />
      <View style={styles.subContainer}>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>{`£${item.price}`}</Text>
          <TouchableOpacity
            onPress={() => OnFavorite(item)}
            activeOpacity={0.7}
          >
            <Icon
              name={isFavorite ? 'heart' : 'hearto'}
              size={22}
              color={COLORS.red}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.colorView}>
          <Text style={styles.text1}>Color</Text>
          <View
            style={[
              styles.colorBox,
              {backgroundColor: item.colour.toLowerCase()},
            ]}
          />
        </View>
        <TouchableOpacity
          onPress={() => AddToBag(item)}
          activeOpacity={0.7}
          style={styles.bagButton}
        >
          <Text style={styles.bagText}>
            {isInBag ? 'Remove from bag' : 'Add to bag'}
          </Text>
        </TouchableOpacity>
      </View>
      {isBag && (
        <View style={styles.counterView}>
          <TouchableOpacity
            onPress={() => pressDecrease(item.quantity ? item.quantity - 1 : 1)}
            activeOpacity={0.5}
            style={styles.addView}
          >
            <Text style={styles.countText}>-</Text>
          </TouchableOpacity>
          <View style={styles.countView}>
            <Text numberOfLines={1} style={styles.countText}>
              {item?.quantity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => pressIncrease(item.quantity ? item.quantity + 1 : 1)}
            activeOpacity={0.5}
            style={styles.addView}
          >
            <Text style={styles.countText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    minHeight: 410,
    backgroundColor: COLORS.lightGray5,
    marginBottom: Theme.spacing(2),
    borderRadius: Theme.radius(2),
  },
  subContainer: {
    padding: Theme.spacing(1),
  },
  text: {
    fontSize: SIZES.body5,
    fontWeight: 'bold',
    marginTop: Theme.spacing(1),
  },
  text1: {
    fontSize: SIZES.body5,
    fontWeight: 'bold',
  },
  colorBox: {
    width: 20,
    height: 20,
    marginLeft: Theme.spacing(1),
    borderRadius: Theme.radius(5),
  },
  bagButton: {
    width: '100%',
    height: 30,
    marginTop: Theme.spacing(1),
    borderRadius: Theme.radius(1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  bagText: {
    fontSize: SIZES.body5,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  img: {
    height: 300,
    borderTopLeftRadius: Theme.radius(1),
    borderTopRightRadius: Theme.radius(1),
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: SIZES.body4,
    fontWeight: 'bold',
  },
  colorView: {
    marginTop: Theme.spacing(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 270,
    height: 26,
    right: 4,
    width: '50%',
    overflow: 'hidden',
    borderRadius: Theme.radius(1),
    borderWidth: 1,
    borderColor: COLORS.lightGray4,
  },
  addView: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countView: {
    flex: 1,
    backgroundColor: COLORS.washedOutBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: 16,
  },
});

export default ProductCard;
