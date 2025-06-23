import 'dart:html' as html;
import 'package:url_launcher/url_launcher.dart';

class UseCase {
  final String name;
  final String description;
  final String url;

  UseCase({required this.name, required this.description, required this.url});

  Future<void> launchURL(String url) async {
    final Uri uri = Uri.parse(url);
    if (!await launchUrl(uri)) {
      print('Could not launch $url');
    }
  }

  void launchEmail(String toEmail, String subject, String body) {
    final Uri emailUri = Uri(
      scheme: 'mailto',
      path: toEmail,
      queryParameters: {'subject': subject, 'body': body},
    );

    // This opens the link in a new browser tab (works reliably on web)
    html.window.open(emailUri.toString(), '_blank');
  }
}
