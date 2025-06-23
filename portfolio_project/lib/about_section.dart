import 'package:flutter/material.dart';
import 'package:portfolio_project/usecase.dart';

class AboutSection extends StatelessWidget {
  const AboutSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(40),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'About Me',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                const Text(
                  '''A dedicated and passionate student with a strong foundation in applied mathematics, data structures, and algorithms. Aspiring to become an AI data scientist, I am eager to leverage my analytical and programming skills to develop innovative AI solutions that can drive positive change. Seeking opportunities to further specialize in AI and contribute to impactful projects in the field.''',
                  style: TextStyle(fontSize: 16),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    final useCase = UseCase(
                      name: 'GitHub',
                      description: 'My GitHub Profile',
                      url: 'assets/resume.pdf',
                    );
                    useCase.launchURL(useCase.url);
                  },

                  child: const Text('View Resume'),
                ),
              ],
            ),
          ),
          SizedBox(width: 20),
          const CircleAvatar(
            radius: 60,
            backgroundImage: AssetImage('images/portfolio.jpg'),
          ),
        ],
      ),
    );
  }
}
