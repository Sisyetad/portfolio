import 'package:flutter/material.dart';

class NavBar extends StatelessWidget {
  final Function(int) onNavTap;

  const NavBar({super.key, required this.onNavTap});

  @override
  Widget build(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width > 768;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      color: Colors.black87,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Text(
            'Portfolio',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          if (isWide)
            Row(
              children: [
                _NavItem(text: 'Home', onTap: () => onNavTap(0)),
                _NavItem(text: 'About', onTap: () => onNavTap(1)),
                _NavItem(text: 'Education', onTap: () => onNavTap(2)),
                _NavItem(text: 'Skills', onTap: () => onNavTap(3)),
                _NavItem(text: 'Contact', onTap: () => onNavTap(4)),
              ],
            )
          else
            IconButton(
              icon: const Icon(Icons.menu, color: Colors.white),
              onPressed: () {
                showModalBottomSheet(
                  context: context,
                  builder: (context) => Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ListTile(
                        title: const Text('Home'),
                        onTap: () {
                          onNavTap(0);
                          Navigator.pop(context);
                        },
                      ),
                      ListTile(
                        title: const Text('About'),
                        onTap: () {
                          onNavTap(1);
                          Navigator.pop(context);
                        },
                      ),
                      ListTile(
                        title: const Text('Education'),
                        onTap: () {
                          onNavTap(2);
                          Navigator.pop(context);
                        },
                      ),
                      ListTile(
                        title: const Text('Skills'),
                        onTap: () {
                          onNavTap(3);
                          Navigator.pop(context);
                        },
                      ),
                      ListTile(
                        title: const Text('Contact'),
                        onTap: () {
                          onNavTap(4);
                          Navigator.pop(context);
                        },
                      ),
                    ],
                  ),
                );
              },
            ),
        ],
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final String text;
  final VoidCallback onTap;

  const _NavItem({required this.text, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: GestureDetector(
        onTap: onTap,
        child: Text(
          text,
          style: const TextStyle(color: Colors.white, fontSize: 16),
        ),
      ),
    );
  }
}
