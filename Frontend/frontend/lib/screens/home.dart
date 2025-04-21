import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
     backgroundColor: const Color.fromARGB(255, 151, 101, 184), 
      appBar: AppBar(
        title: Text("Hello"),
         centerTitle: true,
         backgroundColor: const Color.fromARGB(255, 151, 101, 184), 
      ),
     
    );
  }
}