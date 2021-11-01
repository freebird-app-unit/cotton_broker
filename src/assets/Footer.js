import * as React from "react"
import Svg, { G, Rect, Path, Text, TSpan } from "react-native-svg"

function Footer_Icon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={116}
      height={116}
      viewBox="0 0 116 116"
      {...props}
    >
      <G data-name="Group 979">
        <G
          data-name="Rectangle 133"
          transform="translate(-17 -804) translate(17 804)"
          fill="#fff"
          stroke="#69ba53"
          strokeWidth={1}
        >
          <Rect width={116} height={116} rx={5} stroke="none" />
          <Rect x={0.5} y={0.5} width={115} height={115} rx={4.5} fill="none" />
        </G>
        <G
          data-name="Group 977"
          transform="translate(-17 -804) translate(63 836)"
          fill="none"
        >
          <Path data-name="Path 213" d="M0 0h24v24H0z" />
          <Path
            data-name="Path 214"
            d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            stroke="#69ba53"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
          <Path
            data-name="Path 215"
            d="M7 9l5-5 5 5"
            stroke="#69ba53"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
          <Path
            data-name="Line 117"
            transform="translate(12 4)"
            stroke="#69ba53"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M0 0L0 12"
          />
        </G>
        <Text
          data-name="Upload Footer"
          transform="translate(-17 -804) translate(47 873)"
          fill="#69ba53"
          fontSize={8}
          fontFamily="Poppins-Regular, Poppins"
        >
          <TSpan x={0} y={0}>
            {"Upload Footer"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}

export default Footer_Icon
