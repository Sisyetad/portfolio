import 'package:flutter/material.dart';
import 'package:portfolio_project/about_section.dart';
import 'package:portfolio_project/contact_section.dart';
import 'package:portfolio_project/education_section.dart';
import 'package:portfolio_project/experience_section.dart';
import 'package:portfolio_project/home_section.dart';
import 'package:portfolio_project/navigation.dart';
import 'package:portfolio_project/skill_section.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

void main() {
  runApp(const PortfolioApp());
}

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My Portfolio',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.blue,
        scaffoldBackgroundColor: Colors.black,
        textTheme: const TextTheme(
          displayLarge: TextStyle(
            color: Colors.white,
            fontSize: 36,
            fontWeight: FontWeight.bold,
          ),
          displayMedium: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontWeight: FontWeight.w600,
          ),
          bodyLarge: TextStyle(color: Colors.white70, fontSize: 16),
          bodyMedium: TextStyle(color: Colors.white70, fontSize: 14),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          ),
        ),
      ),
      home: const PortfolioHomePage(),
    );
  }
}

class PortfolioHomePage extends StatefulWidget {
  const PortfolioHomePage({super.key});

  @override
  State<PortfolioHomePage> createState() => _PortfolioHomePageState();
}

class _PortfolioHomePageState extends State<PortfolioHomePage> {
  final ScrollController _scrollController = ScrollController();
  final List<GlobalKey> _sectionKeys = List.generate(6, (_) => GlobalKey());
  int _currentIndex = 0;

  void _scrollToSection(int index) {
    final context = _sectionKeys[index].currentContext;
    if (context != null) {
      Scrollable.ensureVisible(
        context,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    }
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bool isMobile = !kIsWeb;
    return Scaffold(
      body: SingleChildScrollView(
        controller: _scrollController,
        child: Column(
          children: [
            NavBar(onNavTap: _scrollToSection),
            HomeSection(key: _sectionKeys[0]),
            AboutSection(key: _sectionKeys[1]),
            ExperienceSection(key: _sectionKeys[2]),
            EducationSection(key: _sectionKeys[3]),
            SkillsSection(key: _sectionKeys[4]),
            ContactSection(key: _sectionKeys[5]),
          ],
        ),
      ),
      bottomNavigationBar: isMobile
          ? BottomNavigationBar(
              currentIndex: _currentIndex,
              onTap: _scrollToSection,
              backgroundColor: Colors.white,
              selectedItemColor: Colors.blue,
              unselectedItemColor: Colors.grey[800],
              items: const [
                BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
                BottomNavigationBarItem(
                  icon: Icon(Icons.person),
                  label: 'About',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.work),
                  label: 'Experience',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.school),
                  label: 'Education',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.build),
                  label: 'Skills',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.contact_mail),
                  label: 'Contact',
                ),
              ],
            )
          : null,
    );
  }
}
