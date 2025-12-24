import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:portfolio_project/usecase.dart';
import 'package:portfolio_project/responsive.dart';

class HomeSection extends StatelessWidget {
  const HomeSection({super.key});

  @override
  Widget build(BuildContext context) {
    final double width = MediaQuery.of(context).size.width;
    // Continuous scaling based on width
    final double overlayTopOpacity = width <= 600
        ? 0.65
        : width >= 1200
        ? 0.45
        : 0.65 - 0.20 * ((width - 600) / (1200 - 600));
    final double overlayBottomOpacity = width <= 600
        ? 0.55
        : width >= 1200
        ? 0.35
        : 0.55 - 0.20 * ((width - 600) / (1200 - 600));
    final double animatedHeight = (width * 0.08).clamp(90.0, 120.0).toDouble();
    final double animatedWidth = (width * 0.60).clamp(340.0, 720.0).toDouble();
    final double t = ((width - 600) / (1200 - 600));
    final double contentAlignY =
        0.05 + (0.18 - 0.05) * t.clamp(0.0, 1.0).toDouble();

    return SizedBox(
      height: 640,
      child: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            'images/photo_2025-12-24_21-24-24.jpg',
            fit: BoxFit.cover,
          ),
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Colors.black.withOpacity(overlayTopOpacity),
                  Colors.black.withOpacity(overlayBottomOpacity),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
          ),
          Align(
            alignment: Alignment(0, contentAlignY),
            child: MaxWidthContainer(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  LayoutBuilder(
                    builder: (context, constraints) {
                      final double computed = (constraints.maxWidth * 0.14)
                          .clamp(32.0, 110.0);
                      return FittedBox(
                        fit: BoxFit.scaleDown,
                        child: Text(
                          'Sisay Tadewos',
                          textAlign: TextAlign.center,
                          maxLines: 1,
                          softWrap: false,
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: computed,
                            fontWeight: FontWeight.bold,
                            height: 1.15,
                          ),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    height: animatedHeight,
                    width: animatedWidth,
                    child: AnimatedTextKit(
                      animatedTexts:  [
                        TypewriterAnimatedText(
                          'Backend & AI — FastAPI · Django · PyTorch',
                          textStyle: TextStyle(
                            color: Colors.white70,
                            fontSize: 20,
                          ),
                          speed: Duration(milliseconds: 90),
                        ),
                        TypewriterAnimatedText(
                          'Async APIs · Redis · Celery · SSE streaming',
                          textStyle: TextStyle(
                            color: Colors.white70,
                            fontSize: 20,
                          ),
                          speed: Duration(milliseconds: 90),
                        ),
                        TypewriterAnimatedText(
                          'Flutter & React · Docker · Render CI/CD',
                          textStyle: TextStyle(
                            color: Colors.white70,
                            fontSize: 20,
                          ),
                          speed: Duration(milliseconds: 90),
                        ),
                      ],
                      repeatForever: true,
                    ),
                  ),
                  const SizedBox(height: 28),
                  Wrap(
                    alignment: WrapAlignment.center,
                    spacing: 12,
                    runSpacing: 10,
                    children: [
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
                      ElevatedButton(
                        onPressed: () {
                          final useCase = UseCase(
                            name: 'Live Project',
                            description: 'Full-Stack / AI project',
                            url: 'https://creativemind-five.vercel.app/',
                          );
                          useCase.launchURL(useCase.url);
                        },
                        child: const Text('Live Project'),
                      ),
                      TextButton(
                        onPressed: () {
                          final useCase = UseCase(
                            name: 'Resume',
                            description: 'Download my resume',
                            url: 'assets/resume.pdf',
                          );
                          useCase.launchURL(useCase.url);
                        },
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.white,
                          side: const BorderSide(color: Colors.white54),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 12,
                          ),
                        ),
                        child: const Text('Download Resume'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
