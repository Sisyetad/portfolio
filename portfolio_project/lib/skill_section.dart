import 'package:flutter/material.dart';

class SkillsSection extends StatelessWidget {
  const SkillsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(40),
      color: Colors.black87,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Skills',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          _SkillBar(skill: 'Flutter', progress: 0.9),
          _SkillBar(skill: 'Clean architecture with DDD', progress: 0.85),
          _SkillBar(skill: 'Django', progress: 0.8),
          _SkillBar(skill: 'ML', progress: 0.7),
        ],
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
