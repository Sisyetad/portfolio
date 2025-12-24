import 'package:flutter/material.dart';
import 'package:portfolio_project/responsive.dart';

class EducationSection extends StatelessWidget {
  const EducationSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40),
      color: Colors.black87,
      child: MaxWidthContainer(
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
                'B.Sc. Software Engineering (Minor: Mathematics & Computational Science)',
                style: TextStyle(
                  fontSize: 16,
                  color: Color.fromARGB(200, 200, 200, 200),
                  height: 1.4,
                ),
              ),
              subtitle: Text(
                'Addis Ababa University (AAiT) · 2023 - 2027 · GPA: 3.82 · Ongoing',
                style: TextStyle(fontSize: 14),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
