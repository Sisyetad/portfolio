import 'package:flutter/material.dart';

class EducationSection extends StatelessWidget {
  const EducationSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(40),
      color: Colors.black87,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text(
            'Education',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 16),
          ListTile(
            leading: Icon(Icons.school, color: Colors.white),
            title: Text(
              'Bachelor of Science in Software Engineering',
              style: TextStyle(
                fontSize: 16,
                color: Color.fromARGB(200, 200, 200, 200),
              ),
            ),
            subtitle: Text(
              'Addis Ababa University, 2023 - 2027',
              style: TextStyle(fontSize: 14),
            ),
          ),
          ListTile(
            leading: Icon(Icons.school, color: Colors.white),
            title: Text(
              'Bachelor of Science in Computer Science and ML',
              style: TextStyle(
                fontSize: 16,
                color: Color.fromARGB(200, 200, 200, 200),
              ),
            ),
            subtitle: Text('A2SV, 2025 - 2026', style: TextStyle(fontSize: 14)),
          ),
        ],
      ),
    );
  }
}
