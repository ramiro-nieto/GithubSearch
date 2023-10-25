import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Alert } from 'react-native';
import RepoList from '../../components/RepoList';
import RepoDetails from '../../components/RepoDetails';
import { fetchGitHubRepositories, saveRepositoryToServer } from '../../api/api';
import { RepositoryDetails, SavedRepo } from '../../types/types';
import { transformRepoData } from '../../utils/transform';
import { styles } from '../../styles/screens/repoSearchStyles';

const RepoSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<RepositoryDetails[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNoAvailableRepo, setShowNoAvailableRepo] = useState(false);
  const [showDetailsView, setShowDetailsView] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryDetails | null>(
    null,
  );

  useEffect(() => {
    if (searchText) {
      fetchGitHubRepositories(searchText)
        .then(data => {
          if (data.length > 0) {
            setShowNoAvailableRepo(false);
            setSearchResults(data);
          } else {
            setSearchResults([]);
            setShowNoAvailableRepo(true);
            setShowDropdown(false);
          }
        })
        .catch(error => {
          console.error(`Error fetching GitHub repositories: ${error}`);
        });
    } else {
      setSearchResults([]);
      setShowDropdown(false);
      setShowNoAvailableRepo(false);
    }
  }, [searchText]);

  const handleSelectRepository = (item: RepositoryDetails) => {
    setSearchText(item.full_name);
    setSelectedRepo(item);
    setShowDetailsView(true);
    setShowDropdown(false);
  };

  const repositoryData = transformRepoData(selectedRepo);

  const saveRepository = async (repositoryData: SavedRepo) => {
    try {
      await saveRepositoryToServer(repositoryData);
      setShowDetailsView(false);
      setSearchText('');
      setSelectedRepo(null);
      Alert.alert('Repo saved');
    } catch (err) {
      const error = err as Error;
      if (error.message === 'Maximum number of saved repositories reached') {
        Alert.alert(
          'Could not save',
          'Maximum number of saved repositories reached.',
        );
      } else if (error.message === 'Repo already saved') {
        Alert.alert('Error', 'Repo already saved');
      } else {
        console.error(`Error saving the repository: ${error}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Search GitHub repositories"
          inputMode="text"
          clearButtonMode="always"
          returnKeyType="search"
          onFocus={() => {
            setIsFocused(true);
            setSelectedRepo(null);
            setShowDetailsView(false);
          }}
          onBlur={() => setIsFocused(false)}
          value={searchText}
          style={[
            styles.textInput,
            isFocused && styles.textInputShadow,
            { borderColor: isFocused ? 'dodgerblue' : '#c0c0c0' },
          ]}
          onChangeText={text => {
            setSearchText(text);
            setShowDropdown(text.length > 0);
            setShowDetailsView(false);
          }}
        />
      </View>
      {showNoAvailableRepo && (
        <View style={styles.noData}>
          <Text>Sorry, could not find that repo</Text>
        </View>
      )}
      {!!searchResults.length && (
        <RepoList
          searchResults={searchResults}
          showDropdown={showDropdown}
          handleSelectRepository={handleSelectRepository}
        />
      )}
      {!showNoAvailableRepo && !searchResults.length && (
        <View style={styles.default}>
          <Text>Start your repo search</Text>
        </View>
      )}
      {showDetailsView && selectedRepo && (
        <RepoDetails
          repository={selectedRepo}
          onSaveRepository={() => {
            saveRepository(repositoryData);
          }}
        />
      )}
    </View>
  );
};

export default RepoSearch;
