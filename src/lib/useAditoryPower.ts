import { useUsers } from '@/service/user/useUserService';
import { useEffect, useState } from 'react';
import { useAccessToken } from './useAccessToken';

export enum AditoryPower {
  WOOD = 0,
  sprout = 1,
  BLOSSOM = 2,
  TREE = 3,
}

export default function useAditoryPower() {
  //1단계 - 통나무 (0점 - 60점)
  //2단계 - 풀 (61점 - 130점)
  //3단계 - 꽃 (131 - 200)
  //4단계 - 나무 (201 - )
  const PowerImage = [
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Wood.png',
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Herb.png',
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Blossom.png',
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Deciduous%20Tree.png',
  ];
  const [aditoryPowerStage, setAditoryPowerStage] = useState(0);
  const [image, setImage] = useState('');
  const [left, setLeft] = useState(0);
  const [aditoryPowerRatio, setAditoryPowerRatio] = useState(0);
  const { accessToken } = useAccessToken();

  const { data: aditoryPower } = useUsers({
    accessToken: accessToken,
    selectFn: (data) => data.data.aditoryPower,
  });

  useEffect(() => {
    if (aditoryPower) {
      aditoryPower < 60
        ? (setAditoryPowerStage(0),
          setImage(PowerImage[0]),
          setAditoryPowerRatio(((aditoryPower - 0) / (60 - 0)) * 100),
          setLeft(61 - aditoryPower))
        : aditoryPower < 130
          ? (setAditoryPowerStage(1),
            setImage(PowerImage[1]),
            setAditoryPowerRatio(((aditoryPower - 60) / (130 - 60)) * 100),
            setLeft(131 - aditoryPower))
          : aditoryPower < 200
            ? (setAditoryPowerStage(2),
              setImage(PowerImage[2]),
              setAditoryPowerRatio(((aditoryPower - 130) / (200 - 130)) * 100),
              setLeft(201 - aditoryPower))
            : (setAditoryPowerStage(3),
              setImage(PowerImage[3]),
              setAditoryPowerRatio(((aditoryPower - 200) / (300 - 200)) * 100),
              setLeft(301 - aditoryPower));
    }
  }, [aditoryPower]);

  return [aditoryPowerStage, image, aditoryPower, aditoryPowerRatio, left];
}
