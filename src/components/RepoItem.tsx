import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RepositoryDetails } from '../types/types';
import { styles } from '../styles/components/repoItemStyles';

interface RepoItemProps {
  item: RepositoryDetails;
  handleSelectRepository: (repo: RepositoryDetails) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ item, handleSelectRepository }) => {
  return (
    <TouchableOpacity onPress={() => handleSelectRepository(item)}>
      <View style={styles.dropdownItem}>
        <Text style={styles.repositoryName}>{item.name}</Text>
        <Text style={styles.repositoryDescription}>{item.description}</Text>
        <Text style={styles.repositoryInfo}>
          Language: {item.language} | Stars: {item.stargazers_count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RepoItem;
