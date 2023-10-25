import React, { useEffect } from 'react';
import { FlatList, Animated } from 'react-native';
import RepoItem from './RepoItem';
import { RepositoryDetails } from '../types/types';
import { styles } from '../styles/components/repoListStyles';

interface RepoListProps {
  handleSelectRepository: (repo: RepositoryDetails) => void;
  searchResults: RepositoryDetails[];
  showDropdown: boolean;
}

const RepoList: React.FC<RepoListProps> = ({
  handleSelectRepository,
  searchResults,
  showDropdown,
}) => {
  const translateY = new Animated.Value(-200);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: showDropdown ? 0 : -200,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showDropdown]);

  return (
    <Animated.View
      style={[styles.dropdownContainer, { transform: [{ translateY }] }]}>
      {showDropdown && (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <RepoItem
              item={item}
              handleSelectRepository={handleSelectRepository}
            />
          )}
        />
      )}
    </Animated.View>
  );
};

export default RepoList;
