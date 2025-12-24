import 'package:flutter/material.dart';

class Breakpoints {
  static const double mobile = 600;
  static const double tablet = 900;
  static const double desktop = 1200;
}

class MaxWidthContainer extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final double maxWidth;

  const MaxWidthContainer({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.symmetric(horizontal: 24),
    this.maxWidth = 1100,
  });

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.topCenter,
      child: Padding(
        padding: padding,
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: maxWidth),
          child: child,
        ),
      ),
    );
  }
}

double responsiveFontSize(
  BuildContext context, {
  required double mobile,
  required double tablet,
  required double desktop,
}) {
  final w = MediaQuery.of(context).size.width;
  if (w < Breakpoints.mobile) return mobile;
  if (w < Breakpoints.tablet) return tablet;
  return desktop;
}
