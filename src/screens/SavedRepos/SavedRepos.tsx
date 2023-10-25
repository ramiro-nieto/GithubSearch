import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';

import { fetchSavedRepositories, deleteRepository } from '../../api/api';
import SavedRepoListItem from '../../components/SavedRepoListItem';
import { SavedRepo } from '../../types/types';
import { styles } from '../../styles/screens/savedReposStyles';

const SavedRepos = () => {
  const [savedRepos, setSavedRepos] = useState<SavedRepo[]>([]);
  const [sortByStars, setSortByStars] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    fetchAndSetRepos();
  }, [isFocused]);

  const fetchAndSetRepos = async () => {
    try {
      const repos = await fetchSavedRepositories();
      setSavedRepos(repos);
    } catch (error) {
      console.error(`Error fetching saved repositories: ${error}`);
    }
  };

  const handleDeleteRepo = async (repoId: string) => {
    try {
      await deleteRepository(repoId);
      setSavedRepos(prevRepos => prevRepos.filter(repo => repo.id !== repoId));
    } catch (error) {
      console.error(`Error deleting repository: ${error}`);
    }
  };

  const handleSortByStars = () => {
    setSortByStars(!sortByStars);
    const sortedRepos = [...savedRepos].sort((a, b) => {
      if (sortByStars) {
        return a.stargazersCount - b.stargazersCount;
      } else {
        return b.stargazersCount - a.stargazersCount;
      }
    });
    setSavedRepos(sortedRepos);
  };

console.log({savedRepos});


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSortByStars}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>
          {sortByStars
            ? 'Sort by Stars [low/high]'
            : 'Sort by Stars [high/low]'}
        </Text>
        <Icon
          style={{ marginLeft: 20, alignSelf: 'center' }}
          name={sortByStars ? 'sort-amount-asc' : 'sort-amount-desc'}
          color="#007bff"
          size={24}
        />
      </TouchableOpacity>
      <FlatList
        data={savedRepos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <SavedRepoListItem repo={item} handleDeleteRepo={handleDeleteRepo} />
        )}
      />
    </View>
  );
};

export default SavedRepos;
