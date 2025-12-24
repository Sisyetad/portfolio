import 'package:flutter/material.dart';
import 'package:portfolio_project/responsive.dart';
import 'package:portfolio_project/usecase.dart';

class AboutSection extends StatelessWidget {
  const AboutSection({super.key});

  @override
  Widget build(BuildContext context) {
    final double width = MediaQuery.of(context).size.width;
    final bool isMobile = width < Breakpoints.mobile;
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40),
      child: MaxWidthContainer(
        child: LayoutBuilder(
          builder: (context, constraints) {
            final isNarrow = constraints.maxWidth < 900;

            final leftContent = Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'About Me',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 16),
                const Text(
                  'Backend and AI developer who ships scalable systems with Python and Linux. I build FastAPI/Django services with Redis + Celery, wire SSE for realtime UX, and train/deploy NLP and RAG pipelines with PyTorch. On the frontend, I deliver Flutter apps with Clean Architecture and React dashboards to keep experiences consistent across devices.',
                  style: TextStyle(fontSize: 16, height: 1.5),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: const [
                    Chip(label: Text('FastAPI · Django')),
                    Chip(label: Text('PyTorch · NLP · RAG')),
                    Chip(label: Text('Redis · Celery · SSE')),
                    Chip(label: Text('Docker · Render CI/CD')),
                    Chip(label: Text('Flutter · Clean Arch')),
                    Chip(label: Text('Linux · Bash')),
                  ],
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    final useCase = UseCase(
                      name: 'Resume',
                      description: 'Download my resume (PDF)',
                      url: 'assets/resume.pdf',
                    );
                    useCase.launchURL(useCase.url);
                  },
                  child: const Text('Download Resume'),
                ),
              ],
            );

            final right = Padding(
              padding: const EdgeInsets.only(left: 20),
              child: CircleAvatar(
                radius: isMobile ? 60 : 100,
                backgroundImage: const AssetImage('images/portfolio.jpg'),
              ),
            );

            if (isNarrow) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [leftContent, const SizedBox(height: 20), right],
              );
            }

            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(child: leftContent),
                right,
              ],
            );
          },
        ),
      ),
    );
  }
}
