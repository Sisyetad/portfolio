import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:portfolio_project/usecase.dart';

class HomeSection extends StatelessWidget {
  const HomeSection({super.key});

  @override
  Widget build(BuildContext context) {
    final bool isMobile = !kIsWeb;
    return Container(
      height: 600,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue, Colors.black],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            isMobile
                ? CircleAvatar(
                    radius: 80,
                    backgroundImage: AssetImage('images/portfolio.jpg'),
                  )
                : CircleAvatar(
                    radius: 130,
                    backgroundImage: AssetImage('images/portfolio.jpg'),
                  ),
            const SizedBox(height: 16),
            const FittedBox(
              fit: BoxFit.scaleDown,
              child: Text(
                'Sisay Tadewos',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              height: 100,
              width: 300, // or whatever height you want
              child: Center(
                child: AnimatedTextKit(
                  animatedTexts: [
                    TypewriterAnimatedText(
                      'Mobile Developer with Flutter clean Arch',
                      textStyle: const TextStyle(
                        color: Colors.white70,
                        fontSize: 24,
                      ),
                      speed: const Duration(milliseconds: 100),
                    ),
                    TypewriterAnimatedText(
                      'Backend Developer with Django soon',
                      textStyle: const TextStyle(
                        color: Colors.white70,
                        fontSize: 24,
                      ),
                      speed: const Duration(milliseconds: 100),
                    ),
                  ],
                  repeatForever: true,
                ),
              ),
            ),

            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                final useCase = UseCase(
                  name: 'GitHub',
                  description: 'My GitHub Profile',
                  url: 'https://github.com/Sisyetad',
                );
                useCase.launchURL(useCase.url);
              },
              child: const Text('View My Work'),
            ),
          ],
        ),
      ),
    );
  }
}
