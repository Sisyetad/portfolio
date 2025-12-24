import 'package:flutter/material.dart';
import 'package:portfolio_project/responsive.dart';
import 'package:portfolio_project/usecase.dart';

class ExperienceSection extends StatelessWidget {
  const ExperienceSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40),
      color: Colors.black,
      child: MaxWidthContainer(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Experience',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            _ExperienceCard(
              role: 'Full-Stack / AI Developer',
              company: 'Self-initiated project',
              period: 'Aug 2025 - Sep 2025 · Addis Ababa',
              linkLabel: 'Live project',
              linkUrl: 'https://creativemind-five.vercel.app/',
              bullets: const [
                'Built an LLM/NLP platform with RAG pipelines, serving 10+ users concurrently.',
                'Authored async FastAPI backend with Redis caching, Celery workers, and hardened security.',
                'Shipped SSE streaming to cut perceived latency by 40% and Dockerized services on Render CI/CD.',
                'Delivered Flutter mobile and React web frontends for cross-platform reach.',
              ],
            ),
            const SizedBox(height: 16),
            _ExperienceCard(
              role: 'Backend Developer',
              company: 'Addis Ababa University',
              period: 'Jun 2025 - Jul 2025 · Addis Ababa',
              bullets: const [
                'Designed secure medical management with JWT + custom RBAC for 50+ simultaneous users.',
                'Added Redis caching and Celery to drop average response times by ~30% and double throughput.',
                'Applied Domain-Driven Design and Clean Architecture to trim bug-fix time by ~25%.',
              ],
            ),
            const SizedBox(height: 16),
            _ExperienceCard(
              role: 'Mobile Developer (Flutter)',
              company: 'Team project',
              period: 'May 2025 - Jun 2025 · Ethiopia',
              bullets: const [
                'Shipped Flutter app with Riverpod + GoRouter for real-time doctor-patient scheduling (50+ clients).',
                'Auto time-slot allocation resolved scheduling conflicts by ~50% and integrated NestJS backend.',
                'Authored UI integration tests to reduce post-release bugs by ~20%.',
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _ExperienceCard extends StatelessWidget {
  final String role;
  final String company;
  final String period;
  final List<String> bullets;
  final String? linkLabel;
  final String? linkUrl;

  const _ExperienceCard({
    required this.role,
    required this.company,
    required this.period,
    required this.bullets,
    this.linkLabel,
    this.linkUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.grey[900],
      elevation: 3,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        role,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        company,
                        style: const TextStyle(
                          fontSize: 16,
                          color: Colors.white70,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        period,
                        style: const TextStyle(
                          fontSize: 14,
                          color: Colors.white54,
                        ),
                      ),
                    ],
                  ),
                ),
                if (linkUrl != null && linkLabel != null)
                  TextButton.icon(
                    onPressed: () {
                      final useCase = UseCase(
                        name: linkLabel!,
                        description: role,
                        url: linkUrl!,
                      );
                      useCase.launchURL(useCase.url);
                    },
                    icon: const Icon(Icons.open_in_new, size: 18),
                    label: Text(linkLabel!),
                    style: TextButton.styleFrom(
                      foregroundColor: Colors.blueAccent,
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 12),
            ...bullets.map(
              (item) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      '• ',
                      style: TextStyle(color: Colors.blueAccent),
                    ),
                    Expanded(
                      child: Text(
                        item,
                        style: const TextStyle(
                          color: Colors.white70,
                          height: 1.4,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
