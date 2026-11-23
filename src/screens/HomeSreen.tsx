import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import { DebouncedSearch } from '@izonnet-web-solution/react-native-debounced-search';

// Sample dataset
const SAMPLE_DATA = [
  { id: '1', title: 'iPhone 16 Pro Max', category: 'Smartphones' },
  { id: '2', title: 'MacBook Pro M4', category: 'Laptops' },
  { id: '3', title: 'Apple Watch Ultra 2', category: 'Wearables' },
  { id: '4', title: 'AirPods Pro 2', category: 'Audio' },
  { id: '5', title: 'iPad Pro 13-inch', category: 'Tablets' },
  { id: '6', title: 'Samsung Galaxy S24 Ultra', category: 'Smartphones' },
  { id: '7', title: 'Sony WH-1000XM5', category: 'Audio' },
  { id: '8', title: 'Dell XPS 15', category: 'Laptops' },
  { id: '9', title: 'Google Pixel 9 Pro', category: 'Smartphones' },
  { id: '10', title: 'iPad Mini 7', category: 'Tablets' },
];

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [filteredList, setFilteredList] = useState(SAMPLE_DATA);
  const [queryText, setQueryText] = useState('');

  const handleSearch = (query: string) => {
    setQueryText(query);

    if (!query.trim()) {
      setFilteredList(SAMPLE_DATA);
      return;
    }

    setLoading(true);

    // Simulate network delay / search API request
    setTimeout(() => {
      const lower = query.toLowerCase();
      const results = SAMPLE_DATA.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          item.category.toLowerCase().includes(lower)
      );
      setFilteredList(results);
      setLoading(false);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Debounced Search</Text>
        <Text style={styles.subtitle}>
          Fast, lag-free search with smart debounce delay
        </Text>
      </View>

      {/* Clean Debounced Search Bar */}
      <View style={styles.searchWrapper}>
        <DebouncedSearch
          placeholder="Search devices, accessories..."
          delay={500}
          loading={loading}
          onSearch={handleSearch}
        />
      </View>

      {/* Filtered Results List */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No items found for "{queryText}"
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 6,
    lineHeight: 20,
  },
  searchWrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  cardCategory: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 15,
    color: '#8E8E93',
  },
});
