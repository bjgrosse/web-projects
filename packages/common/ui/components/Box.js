import React, { forwardRef } from "react";
import { Box as BoxBase } from "theme-ui";

export const Box = forwardRef((props, ref) => {
  let sx = {};

  function applyProps(keyValues, prop, fn) {
    if (Array.isArray(keyValues)) {
      for (var key of keyValues) {
        if (props[key]) {
          sx[prop] = key;
        }
      }
    } else {
    }
  }

  if (props.fullWidth || props.full || props.fixed) {
    if (props.absolute) {
      sx = { ...sx, ...{ left: "0px", right: "0px" } };
    } else {
      sx = { ...sx, ...{ width: "100%", flexBasis: "100%" } };
    }
  }

  if (props.fullHeight || props.full || props.fixed) {
    if (props.absolute) {
      sx = { ...sx, ...{ top: "0px", bottom: "0px" } };
    } else {
      sx = { ...sx, ...{ height: "100%", flexBasis: "100%" } };
    }
  }

  if (props.absolute && props.center) {
    sx = {
      ...sx,
      ...{
        top: "0px",
        bottom: "0px",
        left: "0px",
        right: "0px",
        margin: "auto"
      }
    };
  }

  if (props.absolute && props.topRight) {
    sx = {
      ...sx,
      ...{
        top: "0px",
        right: "0px",
        margin: "auto"
      }
    };
  }

  if (props.absolute && props.right) {
    sx = {
      ...sx,
      ...{
        top: "0px",
        bottom: "0px",
        right: "0px",
        margin: "auto"
      }
    };
  }

  if (props.absolute && props.left) {
    sx = {
      ...sx,
      ...{
        top: "0px",
        bottom: "0px",
        left: "0px",
        margin: "auto"
      }
    };
  }

  if (props.column) {
    sx = {
      ...sx,
      ...{
        display: "flex",
        flexDirection: "column"
      }
    };
  }

  if (props.wrap) {
    sx = {
      ...sx,
      ...{
        display: "flex",
        flexWrap: "wrap"
      }
    };
  }
  if (props.wrapReverse) {
    sx = {
      ...sx,
      ...{
        display: "flex",
        flexWrap: "wrap-reverse"
      }
    };
  }
  if (props.flexCenter) {
    sx = {
      ...sx,
      ...{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
      }
    };
  }

  if (props.grow) {
    sx = {
      ...sx,
      ...{
        flexGrow: props.grow === true ? 1 : props.grow
      }
    };
  }
  if (props.shrink) {
    sx = {
      ...sx,
      ...{
        flexShrink: props.shrink === true ? 1 : props.shrink
      }
    };
  }

  applyProps(["fixed", "absolute", "relative"], "position");
  applyProps(
    {
      flex: null,
      inline: null,
      inlineBlock: "inline-block",
      block: null,
      table: null,
      tableCell: "table-cell",
      tableRow: "table-row"
    },
    "display"
  );

  if (props.scroll) {
    sx.overflow = "auto";
  }
  if (props.scrollY) {
    sx.overflowY = "auto";
  }
  if (props.scrollX) {
    sx.overflowX = "auto";
  }

  if (props.noOverflow) {
    sx.overflow = "hidden";
  }
  if (props.noOverflowY) {
    sx.overflowY = "hidden";
  }
  if (props.noOverflowX) {
    sx.overflowX = "hidden";
  }
  return <BoxBase ref={ref} {...props} __css={sx} />;
});
//   const { colorMode } = useColorMode();
//   const theme = useTheme();

//   const _props = { ...props, colorMode, theme };
//   return (
//     <BoxEnhanced {...props} {...colorVariantProps(_props)}>
//       {props.children}
//     </BoxEnhanced>
//   );
// };

export default Box;
