import 'package:flutter/material.dart';
import 'package:portfolio_project/responsive.dart';

class SkillsSection extends StatelessWidget {
  const SkillsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40),
      color: Colors.black87,
      child: MaxWidthContainer(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Skills',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            const _SkillBar(
              skill: 'Backend (FastAPI · Django)',
              progress: 0.92,
            ),
            const _SkillBar(
              skill: 'AI/ML (PyTorch · NLP · RAG)',
              progress: 0.86,
            ),
            const _SkillBar(
              skill: 'Flutter (Clean Architecture)',
              progress: 0.9,
            ),
            const _SkillBar(skill: 'React.js & TypeScript', progress: 0.72),
            const _SkillBar(
              skill: 'Databases (PostgreSQL · MySQL)',
              progress: 0.8,
            ),
            const _SkillBar(
              skill: 'DevOps (Docker · Redis · Celery)',
              progress: 0.82,
            ),
            const _SkillBar(
              skill: 'Testing (pytest · integration)',
              progress: 0.78,
            ),
            const _SkillBar(
              skill: 'Architecture (DDD · Microservices)',
              progress: 0.88,
            ),
          ],
        ),
      ),
    );
  }
}

class _SkillBar extends StatelessWidget {
  final String skill;
  final double progress;

  const _SkillBar({required this.skill, required this.progress});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(skill, style: const TextStyle(fontSize: 16)),
          const SizedBox(height: 4),
          LinearProgressIndicator(
            value: progress,
            backgroundColor: Colors.grey[800],
            color: Colors.blue,
            minHeight: 8,
          ),
        ],
      ),
    );
  }
}
